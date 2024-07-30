"use strict";

const sql = require('mssql/msnodesqlv8');

const config = {
    connectionString: `Driver=SQL Server;Server=${process.env.DB_SERVER};Database=${process.env.DATABAE_NAME}`
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQLServer...');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql, poolPromise
};