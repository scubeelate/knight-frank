"use strict";
const moment = require("moment");
const { sql, poolPromise } = require('../../database/connection');

class Log {
  static get tableName() {
    return "logs";
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

  static list = async (request) => {
    const pool = await poolPromise;
    const { size = 10, page = 1, from = '', to = '' } = request.query;
    const userId = request.params.id;
  
    let query = `
      SELECT logs.*, users.name as user_name
      FROM ${this.tableName}
      JOIN users ON ${this.tableName}.user_id = users.id
      WHERE ${this.tableName}.user_id = @userId
    `;
  
    if (from && to) {
      query += ` AND ${this.tableName}.created_at BETWEEN @start AND @end`;
    }
  
    query += `
      ORDER BY ${this.tableName}.id DESC
      OFFSET ${(page - 1) * size} ROWS
      FETCH NEXT ${size} ROWS ONLY
    `;
  
    try {
      // Execute the main query to fetch paginated data
     const rs = await pool.request()
    .input('userId', sql.Int, userId)
    .input('start', sql.DateTime2, from ?  moment(from).startOf('day').format('YYYY-MM-DD HH:mm:ss') : null)
    .input('end', sql.DateTime2, to ? moment(to).endOf('day').format('YYYY-MM-DD HH:mm:ss') : null)
    .query(query);
  
      // Execute a separate query to get the total count
      const countQuery = `
        SELECT COUNT(*) as total
        FROM ${this.tableName}
        WHERE user_id = @userId
      `;
  
      const totalRs = await pool.request()
        .input('userId', sql.Int, userId)
        .query(countQuery);
  
      const total = totalRs.recordset[0].total;
  
      return {
        data: rs.recordset,
        pagination: {
          total: total,
          perPage: size,
          currentPage: page,
          lastPage: Math.ceil(total / size),
        },
      };
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  };
  
}

module.exports = Log;
