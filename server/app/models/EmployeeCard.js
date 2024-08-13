"use strict";

const { sql, poolPromise } = require('../../database/connection');
const moment = require('moment');

class EmployeeCard {
  static get tableName() {
    return "employee_cards";
  }

  static create = async (data) => {
    const pool = await poolPromise;
    const rs = await pool
      .request()
      .input('EmployeeId', sql.Int, data.employee_id)
      .input('CardUUID', sql.VarChar(225), data.card_uuid)
      .input('Name', sql.VarChar(50), data.name)
      .input('EmpId', sql.VarChar(50), data.emp_id)
      .input('Department', sql.VarChar(225), data.department)
      .input('Designation', sql.VarChar(225), data.designation)
      .input('CardStatus', sql.VarChar, 'REQUESTED')
      .input('CreatedAt', sql.DateTime2, moment().format('YYYY-MM-DD HH:mm:ss'))
      .input('UpdatedAt', sql.DateTime2, moment().format('YYYY-MM-DD HH:mm:ss'))
      .input('createdBy', sql.Int, data.created_by)
      .query(`INSERT INTO employee_cards (
          employee_id,
          card_uuid,
          name,
          emp_id,
          department,
          designation,
          card_status,
        created_at,
        updated_at,
        created_by
    )
    VALUES (
        @EmployeeId,
        @CardUUID,
        @Name,
        @EmpId,
        @Department,
        @Designation,
        @CardStatus,
        @CreatedAt,
        @UpdatedAt,
        @createdBy
    )`);

    return rs.rowsAffected;
  }


  static list = async (request) => {
    const pool = await poolPromise;
    const { size = 10, page = 1, search = '', dispatched_from = '', dispatched_to = '', status = '' } = request.query;

    // Construct the main query for fetching paginated data
    let query = `
        SELECT id, name, emp_id, designation, department, created_at, card_print_status, dispatched_date 
        FROM ${this.tableName}
        WHERE 1 = 1`;

    // Add conditions based on search, dispatched date range, and status
    if (search) {
      query += ` AND (name LIKE @search OR emp_id LIKE @search)`;
    }
    if (dispatched_from && dispatched_to) {
      query += ` AND dispatched_date BETWEEN @dispatched_from AND @dispatched_to`;
    }
    if (status) {
      query += ` AND card_print_status = @status`;
    }

    // Add pagination
    query += `
        ORDER BY id DESC
        OFFSET ${(page - 1) * size} ROWS
        FETCH NEXT ${size} ROWS ONLY`;

    // Execute the main query
    const rs = await pool.request()
      .input('search', sql.VarChar, `%${search}%`)
      .input('dispatched_from', sql.DateTime, dispatched_from || null)
      .input('dispatched_to', sql.DateTime, dispatched_to || null)
      .input('status', sql.VarChar, status)
      .query(query);

    // Construct and execute the count query
    const countQuery = `
        SELECT COUNT(*) as total
        FROM ${this.tableName}
        WHERE 1 = 1
        ${search ? ` AND (name LIKE @search OR emp_id LIKE @search)` : ''}
        ${dispatched_from && dispatched_to ? ` AND dispatched_date BETWEEN @dispatched_from AND @dispatched_to` : ''}
        ${status ? ` AND card_print_status = @status` : ''}`;

    const countRs = await pool.request()
      .input('search', sql.VarChar, `%${search}%`)
      .input('dispatched_from', sql.DateTime, dispatched_from || null)
      .input('dispatched_to', sql.DateTime, dispatched_to || null)
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

    // Define a map of SQL data types
    const sqlTypes = {
        'string': sql.VarChar,
        'number': sql.Int,
        'boolean': sql.Bit,
    };

    // Iterate over the queryObj to add inputs to the request
    Object.entries(queryObj).forEach(([key, value]) => {
        const valueType = typeof value;
        const sqlType = sqlTypes[valueType] || sql.VarChar; // Default to VarChar if type not in map
        request.input(key, sqlType, value);
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
      .input('PrintStatus', sql.VarChar(50), data.card_print_status)
      .input('DispatchedDate', sql.DateTime2, data.card_print_status === "DISPATCHED" ? moment().format('YYYY-MM-DD HH:mm:ss') : null)
      .input('updatedBy', sql.Int, data.updated_by)
      .input('IsActive', sql.Bit, data.is_active)
      .input('CardStatus', sql.VarChar(50), data.card_status)
      .input('UpdatedAt', sql.DateTime2, moment().format('YYYY-MM-DD HH:mm:ss'))
      .query(`UPDATE employee_cards SET
      card_status = @CardStatus,
      is_active = @IsActive,
      card_print_status = @PrintStatus,
      dispatched_date = @DispatchedDate,
                updated_by = @updatedBy,
                updated_at = @UpdatedAt
                WHERE id = @Id`);

    return rs.rowsAffected;
  }

  static updatedCardStatus = async (id, data) => {
    const pool = await poolPromise;
    const rs = await pool
      .request()
      .input('Id', sql.Int, id)
      .input('CardStatus', sql.VarChar(50), data.card_status)
      .input('Remark', sql.NVarChar(sql.MAX), data.remark)
      .input('IsActive', sql.Bit, data.is_active)
      .input('updatedBy', sql.Int, data.updated_by)
      .input('UpdatedAt', sql.DateTime2, moment().format('YYYY-MM-DD HH:mm:ss'))
      .query(`UPDATE employee_cards SET
      card_status = @CardStatus,
      remark =  @Remark,
                updated_by = @updatedBy,
                is_active = @IsActive,
                updated_at = @UpdatedAt
                WHERE id = @Id`);

    return rs.rowsAffected;
  }

  static employeeCardsList = async (employee_id) => {
    const pool = await poolPromise;
    const query = `
      SELECT id, card_uuid, created_at, card_status, is_active, card_print_status, remark 
      FROM ${this.tableName} 
      WHERE employee_id = @employee_id 
      ORDER BY id DESC
    `;
    const rs = await pool.request().input('employee_id', sql.Int, employee_id).query(query);
    return rs.recordset;
  };

  static employeeCardReport = async (params) => {
    const pool = await poolPromise;
    const { from, to, report_type } = params;
    let query = `SELECT id, emp_id, name, designation, created_at, card_print_status, dispatched_date FROM ${this.tableName} WHERE 1=1`;

    if (from && to) {
      const start = moment(from).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      const end = moment(to).endOf('day').format('YYYY-MM-DD HH:mm:ss');
      query += ` AND dispatched_date BETWEEN '${start}' AND '${end}'`;
    }

    if (report_type) {
      query += ` AND is_reprint = ${report_type === 're_print' ? 1 : 0}`;
    }

    query += ` ORDER BY id DESC`;

    const rs = await pool.request().query(query);
    return rs.recordset;
  };

  static employeeCardInfo = async (card_uuid) => {
    const pool = await poolPromise;
    const query = `
      SELECT 
        employees.id,
        employees.name,
        employees.designation,
        employees.department,
        employees.phone,
        employees.image_base64,
        employees.email,
        employees.work_location,
        employees.emp_id,
        employee_cards.is_active,
        employee_cards.card_uuid
      FROM ${this.tableName}
      INNER JOIN employees ON employee_cards.employee_id = employees.id
      WHERE employee_cards.card_uuid = @card_uuid AND employee_cards.is_active = 1
    `;
    const rs = await pool.request().input('card_uuid', sql.VarChar, card_uuid).query(query);
    return rs.recordset[0];
  };
}

module.exports = EmployeeCard;
