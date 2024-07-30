"use strict";


const { sql, poolPromise } = require('../../database/connection')
const moment = require('moment');

class User {
  static get tableName() {
    return 'users';
  }


  static create = async (data) => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .input('Name', sql.VarChar(50), data.name)
        .input('Email', sql.VarChar(225), data.email)
        .input('Phone', sql.VarChar(225), data.phone)
        .input('RoleId',sql.Int, data.role_id)
        .input('Password',sql.Int, data.password)
        .input('IsActive',sql.Int, 1)
        .input('CreatedAt',sql.DateTime2, moment().format('YYYY-MM-DD HH:mm:ss'))
        .input('UpdatedAt',sql.DateTime2,moment().format('YYYY-MM-DD HH:mm:ss'))
        .input('createdBy', sql.Int, data.created_by)
        .query(`INSERT INTO users (
        name,
        email,
        phone,
        role_id,
        password,
        is_active,
        created_at,
        updated_at,
        created_by
    )
    VALUES (
        @Name,
        @Email,
        @Phone,
        @RoleId,
        @Password,
        @IsActive,
        @CreatedAt,
        @UpdatedAt,
        @createdBy
    )`);

    return rs.rowsAffected;
  }


  static paginate = async (request) => {
    const pool = await poolPromise;
  
    // Construct the query to fetch filtered data
    let filteredQuery = `
      SELECT u.id, u.name, u.created_at, u.email, u.phone, u.is_active, u.role_id, r.name as role_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE 1 = 1`;
  
    const {
      status = '',
      search = '',
      role = '',
      page = 1,
      size = 10
    } = request.query;
  
    if (search) {
      filteredQuery += `
        AND (u.name LIKE '%' + @search + '%'
        OR u.id LIKE '%' + @search + '%'
        OR u.email LIKE '%' + @search + '%')`;
    }
  
    if (status) {
      filteredQuery += `
        AND u.is_active = @status`;
    }
  
    if (role) {
      filteredQuery += `
        AND u.role_id = @role`;
    }
  
    filteredQuery += `
      ORDER BY u.id DESC
      OFFSET ${(page - 1) * size} ROWS
      FETCH NEXT ${size} ROWS ONLY`;
  
    // Construct the query to fetch total count
    let countQuery = `SELECT COUNT(*) as total FROM users u WHERE 1 = 1`;
  
    if (search) {
      countQuery += `
        AND (u.name LIKE '%' + @search + '%'
        OR u.id LIKE '%' + @search + '%'
        OR u.email LIKE '%' + @search + '%')`;
    }
  
    if (status) {
      countQuery += `
        AND u.is_active = @status`;
    }
  
    if (role) {
      countQuery += `
        AND u.role_id = @role`;
    }
  
    try {
      // Execute the filtered data query
      const filteredResult = await pool.request()
        .input('search', sql.VarChar, search)
        .input('status', sql.Int, status === 'true' ? 1 : 0)
        .input('role', sql.Int, Number(role))
        .query(filteredQuery);
  
      // Execute the total count query
      const countResult = await pool.request()
        .input('search', sql.VarChar, search)
        .input('status', sql.Int, status === 'true' ? 1 : 0)
        .input('role', sql.Int, Number(role))
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
    const rs = await pool
      .request()
      .input('Id', sql.Int, id)
      .query(`SELECT * FROM users WHERE id = @Id`);

    return rs.recordset[0];
  }
  static findOne = async(query) => {
    const pool = await poolPromise;
    let conditions = Object.keys(query).map(key => `${key} = @${key}`).join(' AND ');
    const request = pool.request();
    Object.entries(query).forEach(([key, value]) => {
      request.input(key, sql.VarChar, value);
    });

    const rs = await request.query(`SELECT * FROM users WHERE ${conditions}`);
    return rs.recordset[0];
  }

  static findByIdAndRemove = async (id) => {
    const pool = await poolPromise;
    const rs = await pool
      .request()
      .input('Id', sql.Int, id)
      .query(`DELETE FROM users WHERE id = @Id`);

    return rs.rowsAffected;
  }

  static updatedRecord = async(id, data) => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .input('Name', sql.VarChar(100), data.name)
        .input('Phone', sql.VarChar(20), data.phone)
        .input('RoleId',sql.Int, data.role_id)
        .input('Id',sql.Int, id)
        .input('updatedBy', sql.Int, data.updated_by)
        .input('IsActive',sql.Int, data.is_active)
        .input('MarkAsExit',sql.Int, data.mark_as_exit)
        
        .query(`UPDATE users SET
                name = @Name,
                phone = @Phone,                   
                role_id = @RoleId,
                updated_by = @updatedBy,
                is_active = @IsActive,
                mark_as_exit = @MarkAsExit
                WHERE id = @Id`);

    return rs.rowsAffected;
  }
  static updatedStatus = async(id, data) => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .input('Id',sql.Int, id)
        .input('updatedBy', sql.Int, data.updated_by)
        .input('IsActive',sql.Int, data.is_active)        
        .query(`UPDATE users SET
                updated_by = @updatedBy,
                is_active = @IsActive
                WHERE id = @Id`);

    return rs.rowsAffected;
  }
}

module.exports = User;