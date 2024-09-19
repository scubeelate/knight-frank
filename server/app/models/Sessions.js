"use strict";

const { sql, poolPromise } = require('../../database/connection');

class Session {
  static get tableName() {
    return 'sessions';
  }

  // Method to create a session
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

  // Method to retrieve a session by sessionId
  static getById = async (sessionId) => {
    const pool = await poolPromise;

    const request = pool.request();
    const result = await request
      .input('sessionId', sql.NVarChar, sessionId)
      .query(`SELECT * FROM ${this.tableName} WHERE SessionId = @sessionId`);

    return result.recordset[0];
  };

  static deleteByUserId = async (userId) => {
    const pool = await poolPromise;

    const request = pool.request();
    await request
      .input('userId', sql.Int, userId)
      .query(`DELETE FROM ${this.tableName} WHERE UserId = @userId`);
  };

static updateUserIdBySessionId = async (sessionId, newUserId) => {
    const pool = await poolPromise;
  
    const request = pool.request();
    await request
      .input('sessionId', sql.NVarChar, sessionId)
      .input('newUserId', sql.Int, newUserId)
      .query(`UPDATE ${this.tableName} SET UserId = @newUserId WHERE SessionId = @sessionId`);
  };

  static updateKeyAndCsrfBySessionId = async (sessionId, publicKey, csrfToken) => {
    const pool = await poolPromise;

    const request = pool.request();
    await request
      .input('sessionId', sql.NVarChar, sessionId)
      .input('publicKey', sql.NVarChar, publicKey)
      .input('csrfToken', sql.NVarChar, csrfToken)
      .query(`UPDATE ${this.tableName} SET PublicKey = @publicKey, CsrfToken = @csrfToken WHERE SessionId = @sessionId`);
  };
  
}

module.exports = Session;
