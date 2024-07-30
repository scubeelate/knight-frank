"use strict";

const { sql, poolPromise } = require('../../database/connection');
const moment = require('moment');

class Role {
  static get tableName() {
    return 'roles';
  }

  static create = async (props) => {
    const pool = await poolPromise;
    const columns = Object.keys(props).join(', ');
    const values = Object.values(props);
    const placeholders = values.map((_, index) => `@value${index}`).join(', ');

    const request = pool.request();
    values.forEach((value, index) => {
      request.input(`value${index}`, value);
    });

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
    await request.query(query);
  };

  static paginate = async (request) => {
    const pool = await poolPromise;
    const { search = '', size = 10, page = 1 } = request.query;

    // Construct the query to fetch filtered data
    let filteredQuery = `
      SELECT roles.id AS id,
             roles.is_manager,
             roles.name,
             roles.is_default,
             roles.created_at,
             (SELECT permissions.id, permissions.module_id, permissions.is_read, permissions.is_write, permissions.is_update, permissions.is_delete
              FROM permissions WHERE permissions.role_id = roles.id
              FOR JSON PATH) AS permissions,
             (SELECT COUNT(users.id) FROM users WHERE users.role_id = roles.id) AS user_count
      FROM roles
      LEFT JOIN users ON roles.id = users.role_id
      WHERE 1=1`;

    if (search) {
      filteredQuery += `
        AND (roles.name LIKE '%' + @search + '%'
        OR roles.email LIKE '%' + @search + '%')`;
    }

    filteredQuery += `
      GROUP BY roles.id, roles.is_manager, roles.name, roles.is_default, roles.created_at
      ORDER BY roles.id DESC
      OFFSET ${(page - 1) * size} ROWS
      FETCH NEXT ${size} ROWS ONLY`;

    // Construct the query to fetch total count
    let countQuery = `SELECT COUNT(*) as total FROM roles WHERE 1=1`;

    if (search) {
      countQuery += `
        AND (roles.name LIKE '%' + @search + '%'
        OR roles.email LIKE '%' + @search + '%')`;
    }

    try {
      // Execute the filtered data query
      const filteredResult = await pool.request()
        .input('search', sql.VarChar, search)
        .query(filteredQuery);

      // Execute the total count query
      const countResult = await pool.request()
        .input('search', sql.VarChar, search)
        .query(countQuery);

      const total = countResult.recordset[0].total;

      return {
        data: filteredResult.recordset,
        pagination: {
          total: total,
          perPage: size,
          currentPage: page,
          lastPage: Math.ceil(total / size),
        },
      };
    } catch (error) {
      // Handle errors
      console.error('Error occurred:', error);
      throw error;
    }
  };






  static findById = async (id) => {
    const pool = await poolPromise;
    const query = `SELECT * FROM ${this.tableName} WHERE id = @id`;

    const rs = await pool.request()
      .input('id', sql.Int, id)
      .query(query);

    return rs.recordset[0];
  };

  static dropdown = async () => {
    const pool = await poolPromise;
    const query = `SELECT name, slug, id FROM ${this.tableName}`;

    const rs = await pool.request().query(query);
    return rs.recordset;
  };

  static findOne = async (queryObj) => {
    const pool = await poolPromise;
    const conditions = Object.keys(queryObj).map((key, index) => `${key} = @value${index}`).join(' AND ');
    const values = Object.values(queryObj);

    const request = pool.request();
    values.forEach((value, index) => {
      request.input(`value${index}`, value);
    });

    const query = `SELECT * FROM ${this.tableName} WHERE ${conditions}`;
    const rs = await request.query(query);

    return rs.recordset[0];
  };

  static findByIdAndRemove = async (id) => {
    const pool = await poolPromise;
    const query = `DELETE FROM ${this.tableName} WHERE id = @id`;

    await pool.request()
      .input('id', sql.Int, id)
      .query(query);
  };

  static updatedRecord = async(id, data) => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .input('Id',sql.Int, id)
        .input('Name', sql.VarChar(100), data.name)
        .input('IsMaganer',sql.Int, data.is_manager)        
        .query(`UPDATE roles SET
                name = @Name,
                is_manager = @IsMaganer
                WHERE id = @Id`);

    return rs.rowsAffected;
  }
}

module.exports = Role;
