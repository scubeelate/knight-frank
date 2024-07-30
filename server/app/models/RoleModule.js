"use strict";

const { sql, poolPromise } = require('../../database/connection');

class RoleModule {
  static get tableName() {
    return 'role_modules';
  }

  static list = async (request) => {
    const pool = await poolPromise;
    const query = `
      SELECT id, name, slug, parent_id
      FROM ${this.tableName}
    `;

    const rs = await pool.request().query(query);
    return rs.recordset;
  }
}

module.exports = RoleModule;
