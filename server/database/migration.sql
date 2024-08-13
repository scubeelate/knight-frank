use nfc_card
-- Table: roles
CREATE TABLE roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL UNIQUE,
    is_deleted BIT DEFAULT 0,
    is_manager BIT DEFAULT 0,
    is_default BIT DEFAULT 0,
    slug NVARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Table: users
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50) NOT NULL,
    email NVARCHAR(225) NOT NULL UNIQUE,
    phone NVARCHAR(50) NULL,
    role_id INT NULL,
    is_active BIT DEFAULT 1,
    mark_as_exit BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    created_by INT NULL,
    updated_by INT NULL,
    CONSTRAINT FK_role_id FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT FK_created_by FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT FK_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Table: access_tokens
CREATE TABLE access_tokens (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    token NVARCHAR(255) NOT NULL UNIQUE,
    issued_at DATETIME DEFAULT GETDATE(),
    expires_at DATETIME NOT NULL,
    last_activity DATETIME DEFAULT GETDATE() NOT NULL,
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table: role_modules
CREATE TABLE role_modules (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50) NOT NULL,
    slug NVARCHAR(50) NOT NULL,
    parent_id INT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_parent_id FOREIGN KEY (parent_id) REFERENCES role_modules(id)
);

-- Table: permissions
CREATE TABLE permissions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    is_read BIT DEFAULT 0,
    is_write BIT DEFAULT 0,
    is_delete BIT DEFAULT 0,
    is_update BIT DEFAULT 0,
    role_id INT NULL,
    module_id INT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_permissions_role_id FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT FK_permissions_module_id FOREIGN KEY (module_id) REFERENCES role_modules(id)
);

-- Table: employees
CREATE TABLE employees (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(150) NOT NULL,
    designation NVARCHAR(100) NOT NULL,
    department NVARCHAR(100) NOT NULL,
    phone NVARCHAR(20) NOT NULL,
    image_base64 VARCHAR(MAX) NULL,
    email NVARCHAR(100) NOT NULL,
    work_location NVARCHAR(MAX) NULL,
    emp_id NVARCHAR(100) NULL,
    is_print_requested BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_active BIT DEFAULT 0,
    card_status NVARCHAR(50) DEFAULT 'NOT_REQUESTED',
    created_by INT NULL,
    updated_by INT NULL,
    CONSTRAINT FK_employees_created_by FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT FK_employees_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Table: employee_cards
CREATE TABLE employee_cards (
    id INT IDENTITY(1,1) PRIMARY KEY,
    employee_id INT NULL,
    card_uuid NVARCHAR(150) NOT NULL UNIQUE,
    is_active BIT DEFAULT 0,
    emp_id NVARCHAR(100) NULL,
    card_print_status NVARCHAR(50) DEFAULT 'NOT_PRINTED',
    card_status NVARCHAR(50) NULL,
    name NVARCHAR(150) NOT NULL,
    designation NVARCHAR(100) NOT NULL,
    department NVARCHAR(100) NOT NULL,
    dispatched_date DATETIME NULL,
    remark NVARCHAR(MAX) NULL,
    is_reprint BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    created_by INT NULL,
    updated_by INT NULL,
    CONSTRAINT FK_employee_cards_employee_id FOREIGN KEY (employee_id) REFERENCES employees(id),
    CONSTRAINT FK_employee_cards_created_by FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT FK_employee_cards_updated_by FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Table: card_activity_logs
CREATE TABLE card_activity_logs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    card_id INT NULL,
    action NVARCHAR(100) NOT NULL,
    message NVARCHAR(225) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_card_activity_logs_card_id FOREIGN KEY (card_id) REFERENCES employee_cards(id)
);

-- Table: logs
CREATE TABLE logs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL,
    module NVARCHAR(100) NOT NULL,
    message NVARCHAR(225) NOT NULL,
    action_type NVARCHAR(225) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_logs_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);