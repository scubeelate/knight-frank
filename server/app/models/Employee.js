"use strict";

const { sql, poolPromise } = require('../../database/connection');
const moment = require('moment');

class Employee {
  static get tableName() {
    return "employees";
  }

  static create = async (data) => {
    const pool = await poolPromise;
    const rs = await pool
      .request()
      .input('Name', sql.VarChar(50), data.name)
      .input('Email', sql.VarChar(225), data.email)
      .input('Phone', sql.VarChar(225), data.phone)
      .input('EmpId', sql.VarChar(50), data.emp_id) // Specify precision value for EmpId
      .input('Department', sql.VarChar(225), data.department)
      .input('Designation', sql.VarChar(225), data.designation)
      .input('WorkLocation', sql.VarChar(), data.work_location)
      .input('Image', sql.VarChar(), data.image_base64)
      .input('BloodGroup', sql.VarChar(10), data.blood_group)
      .input('CreatedAt', sql.DateTime2, moment().format('YYYY-MM-DD HH:mm:ss'))
      .input('UpdatedAt', sql.DateTime2, moment().format('YYYY-MM-DD HH:mm:ss'))
      .input('createdBy', sql.Int, data.created_by)
      .query(`
            INSERT INTO employees (
                name,
                email,
                phone,
                emp_id,
                department,
                designation,
                work_location,
                image_base64,
                blood_group,
                created_at,
                updated_at,
                created_by
            )
            VALUES (
                @Name,
                @Email,
                @Phone,
                @EmpId,
                @Department,
                @Designation,
                @WorkLocation,
                @Image,
                @BloodGroup,
                @CreatedAt,
                @UpdatedAt,
                @createdBy
            )
        `);

    return rs.rowsAffected;
  }


  static list = async (request) => {
    const pool = await poolPromise;
    const { size = 10, page = 1, search = '', from = '', to = '', status = '' } = request.query;

    // Construct the main query for fetching paginated data
    let query = `
        SELECT id, name, designation, department, phone, email, created_at, card_status, emp_id, image_base64
        FROM ${this.tableName}
        WHERE 1 = 1`;

    // Add conditions based on search, date range, and status
    if (search) {
      query += ` AND (name LIKE @search OR phone LIKE @search OR email LIKE @search OR emp_id LIKE @search)`;
    }
    if (from && to) {
      query += ` AND created_at BETWEEN @from AND @to`;
    }
    if (status) {
      query += ` AND card_status = @status`;
    }

    // Add pagination
    query += `
        ORDER BY id DESC
        OFFSET ${(page - 1) * size} ROWS
        FETCH NEXT ${size} ROWS ONLY`;

    // Execute the main query
    const rs = await pool.request()
      .input('search', sql.VarChar, `%${search}%`)
      .input('from', sql.DateTime, from || null)
      .input('to', sql.DateTime, to || null)
      .input('status', sql.VarChar, status)
      .query(query);

    // Construct and execute the count query
    const countQuery = `
        SELECT COUNT(*) as total
        FROM ${this.tableName}
        WHERE 1 = 1
        ${search ? ` AND (name LIKE @search OR phone LIKE @search OR email LIKE @search OR emp_id LIKE @search)` : ''}
        ${from && to ? ` AND created_at BETWEEN @from AND @to` : ''}
        ${status ? ` AND card_status = @status` : ''}`;

    const countRs = await pool.request()
      .input('search', sql.VarChar, `%${search}%`)
      .input('from', sql.DateTime, from || null)
      .input('to', sql.DateTime, to || null)
      .input('status', sql.VarChar, status)
      .query(countQuery);

    // Return the paginated data along with pagination details
    return {
      data: rs.recordset,
      pagination: {
        total: countRs.recordset[0].total,
        perPage: size,
        currentPage: page,
        lastPage: Math.ceil(countRs.recordset[0].total / size),
      },
    };
  };



  static findById = async (id) => {
    const pool = await poolPromise;
    const query = `SELECT * FROM ${this.tableName} WHERE id = @id`;
    const rs = await pool.request().input('id', sql.Int, id).query(query);
    return rs.recordset[0];
  };

  static findOne = async (queryObj) => {
    const pool = await poolPromise;
    const columns = Object.keys(queryObj).map(key => `${key} = @${key}`).join(' AND ');
    const query = `SELECT * FROM ${this.tableName} WHERE ${columns}`;

    const request = pool.request();
    Object.entries(queryObj).forEach(([key, value]) => {
      request.input(key, value);
    });

    const rs = await request.query(query);
    return rs.recordset[0];
  };

  static findByIdAndRemove = async (id) => {
    const pool = await poolPromise;
    const query = `DELETE FROM ${this.tableName} WHERE id = @id`;
    await pool.request().input('id', sql.Int, id).query(query);
  };

  static updatedRecord = async (id, data) => {
    const pool = await poolPromise;
    const rs = await pool
      .request()
      .input('Id', sql.Int, id)
      .input('Name', sql.VarChar(50), data.name)
      .input('Email', sql.VarChar(225), data.email)
      .input('Phone', sql.VarChar(225), data.phone)
      .input('EmpId', sql.VarChar(50), data.emp_id) // Specify precision value for EmpId
      .input('Department', sql.VarChar(225), data.department)
      .input('Designation', sql.VarChar(225), data.designation)
      .input('WorkLocation', sql.VarChar(), data.work_location)
      .input('Image', sql.Text(), data.image_base64)
      .input('BloodGroup', sql.VarChar(10), data.blood_group)
      .input('UpdatedAt', sql.DateTime2, moment().format('YYYY-MM-DD HH:mm:ss'))
      .input('updatedBy', sql.Int, data.updated_by)
      .query(`UPDATE employees SET
                name = @Name,
                email = @Email,
                phone = @Phone,                   
                emp_id = @EmpId,
                department = @Department,
                designation = @Designation,
                work_location = @WorkLocation,
                image_base64 = @Image,
                updated_by = @updatedBy,
                blood_group = @BloodGroup,
                updated_at = @UpdatedAt
                WHERE id = @Id`);

    return rs.rowsAffected;
  }

  static updatedCardStatus = async (id, data) => {
    const pool = await poolPromise;
    const rs = await pool
      .request()
      .input('Id', sql.Int, id)
      .input('PrintStatus', sql.VarChar(50), data.is_print_requested)
      .input('CardStatus', sql.VarChar(225), data.card_status)
      .input('UpdatedAt', sql.DateTime2, moment().format('YYYY-MM-DD HH:mm:ss'))
      .query(`UPDATE employees SET
        is_print_requested = @PrintStatus,
        card_status = @CardStatus,
                updated_at = @UpdatedAt
                WHERE id = @Id`);

    return rs.rowsAffected;
  }

  static updatedEmployeeCardStatus = async (id, data) => {
    const pool = await poolPromise;
    const rs = await pool
      .request()
      .input('Id', sql.Int, id)
      .input('CardStatus', sql.VarChar(225), data.card_status)
      .input('IsActive', sql.Bit, data.is_active)
      .input('isPrintRequested', sql.Bit, data.card_status === "DISABLED" ? 0 : 1)
      .input('UpdatedAt', sql.DateTime2, moment().format('YYYY-MM-DD HH:mm:ss'))
      .query(`UPDATE employees SET
      is_active = @IsActive,
        card_status = @CardStatus,
        is_print_requested = @isPrintRequested,
                updated_at = @UpdatedAt
                WHERE id = @Id`);

    return rs.rowsAffected;
  }


  static isExists = async (body) => {
    const pool = await poolPromise;
    const query = `SELECT * FROM ${this.tableName} WHERE email = @email OR emp_id = @emp_id`;
    const rs = await pool.request()
      .input('email', body.email.replace(/\s+/g, ''))
      .input('emp_id', body.emp_id)
      .query(query);
    return rs.recordset[0];
  };

  static totalCardsCount = async () => {
    const pool = await poolPromise;
    const query = `SELECT COUNT(*) as total FROM ${this.tableName}`;
    const rs = await pool.request().query(query);
    return rs.recordset[0]['total'];
  };

  static totalActiveCardsCount = async () => {
    const pool = await poolPromise;
    const query = `SELECT COUNT(*) as total FROM ${this.tableName} WHERE is_active = 1`;
    const rs = await pool.request().query(query);
    return rs.recordset[0]['total'];
  };

  static totalInActiveCardsCount = async () => {
    const pool = await poolPromise;
    const query = `SELECT COUNT(*) as total FROM ${this.tableName} WHERE is_active = 0`;
    const rs = await pool.request().query(query);
    return rs.recordset[0]['total'];
  };

  static totalEmployees = async (request) => {
    const pool = await poolPromise;
    const { type = 1 } = request.query;
    let query = `SELECT id, name, designation, department, phone, email, created_at, card_status, emp_id, image_base64
                 FROM ${this.tableName} ORDER BY id DESC`;
    const rs = await pool.request().query(query);
    return rs.recordset;
  };
}

module.exports = Employee;
