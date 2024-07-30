"use strict";
const { sql, poolPromise } = require('../../database/connection');
const moment = require('moment');

class CardActivityLog {
  static get tableName() {
    return "card_activity_logs";
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

  static dashboardStats = async (request) => {
    const pool = await poolPromise;
    let query = '';
  
    if (request.from && request.to) {
      const startDate = moment(request.from).startOf('day').format("YYYY-MM-DD HH:mm:ss");
      const endDate = moment(request.to).endOf('day').format("YYYY-MM-DD HH:mm:ss");
      const diffInDays = moment(request.to).diff(moment(request.from), 'days');
  
      if (diffInDays === 1) {
        query = `SELECT CONVERT(varchar, created_at, 120) AS date, COUNT(DISTINCT id) AS count
                  FROM ${this.tableName}
                  WHERE action = 'CARD_SHARED' AND (created_at >= '${startDate}' AND created_at <= '${endDate}')
                  GROUP BY CONVERT(varchar, created_at, 120)`;
      } else if (diffInDays <= 30) {
        query = `SELECT CONVERT(varchar, created_at, 23) AS date, COUNT(DISTINCT id) AS count
                    FROM ${this.tableName}
                    WHERE action = 'CARD_SHARED' AND (created_at >= '${startDate}' AND created_at <= '${endDate}')
                    GROUP BY CONVERT(varchar, created_at, 23)`;
      } else if (diffInDays > 30 && diffInDays <= 365) {
        query = `SELECT CONVERT(varchar, created_at, 7) AS date, COUNT(DISTINCT id) AS count
                    FROM ${this.tableName}
                    WHERE action = 'CARD_SHARED' AND (created_at >= '${startDate}' AND created_at <= '${endDate}')
                    GROUP BY CONVERT(varchar, created_at, 7)`;
      } else {
        query = `SELECT CONVERT(varchar, created_at, 5) AS date, COUNT(DISTINCT id) AS count
                    FROM ${this.tableName}
                    WHERE action = 'CARD_SHARED' AND (created_at >= '${startDate}' AND created_at <= '${endDate}')
                    GROUP BY CONVERT(varchar, created_at, 5)`;
      }
    } else {
      query = `SELECT CONVERT(varchar, created_at, 7) AS date, COUNT(DISTINCT id) AS count
                FROM ${this.tableName}
                WHERE action = 'CARD_SHARED'
                GROUP BY CONVERT(varchar, created_at, 7)`;
    }
  
    const rs = await pool.request().query(query);
    return rs.recordset.map(row => ({ date: row.date, count: row.count }));
  };
}

module.exports = CardActivityLog;
