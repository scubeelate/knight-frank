"use strict";

const { sql, poolPromise } = require('../../database/connection');
const moment = require('moment');

class Permission {
  static get tableName() {
    return 'permissions';
  }

  static create = async (propsArray) => {
    const pool = await poolPromise;

    for (const props of propsArray) {
        const columns = Object.keys(props).join(', ');
        const values = Object.values(props);
        const placeholders = values.map((_, index) => `@value${index}`).join(', ');

        const request = pool.request();
        values.forEach((value, index) => {
            request.input(`value${index}`, this.getType(value), value);
        });

        const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
        await request.query(query);
    }
};


static getType(value) {
    switch (typeof value) {
        case 'string':
            return sql.VarChar;
        case 'number':
            return Number.isInteger(value) ? sql.Int : sql.Float;
        case 'boolean':
            return sql.Bit;
        case 'object':
            if (value instanceof Date) return sql.DateTime;
            return sql.VarChar; // Handle other object types as needed
        default:
            return sql.VarChar;
    }
}
  static list = async (request) => {
    const pool = await poolPromise;
    const { size = 10, page = 1 } = request.query;

    let query = `
      SELECT 
        roles.id AS id,
        roles.is_manager,
        roles.name,
        roles.is_default,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('permission_id', p.id, 'module_id', p.module_id, 'is_read', p.is_read, 'is_write', p.is_write, 'is_update', p.is_update, 'is_delete', p.is_delete)) 
         FROM permissions p 
         WHERE p.role_id = roles.id) AS permissions
      FROM roles
      LEFT JOIN permissions ON roles.id = permissions.role_id
      GROUP BY roles.id, roles.is_manager, roles.name, roles.is_default
      ORDER BY roles.id DESC
      OFFSET ${(page - 1) * size} ROWS
      FETCH NEXT ${size} ROWS ONLY
    `;

    const rs = await pool.request().query(query);
    return rs.recordset;
  };

  static permissionByRole = async (id) => {
    const pool = await poolPromise;
    const query = `SELECT * FROM ${this.tableName} WHERE role_id = @role_id`;

    const rs = await pool.request()
      .input('role_id', sql.Int, id)
      .query(query);

    return rs.recordset;
  };

  static findByIdAndRemove = async (id) => {
    const pool = await poolPromise;
    const query = `DELETE FROM ${this.tableName} WHERE role_id = @role_id`;

    await pool.request()
      .input('role_id', sql.Int, id)
      .query(query);
  };
}

module.exports = Permission;
