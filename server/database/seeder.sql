
use nfc_card

-- Seed data for table: roles
BEGIN TRANSACTION;

DELETE FROM roles;

SET IDENTITY_INSERT roles ON;

INSERT INTO roles (id, name, is_deleted, is_manager, is_default, slug, created_at, updated_at)
VALUES
(1, 'Admin', 0, 1, 1, 'admin', GETDATE(), GETDATE()),
(2, 'Executive', 0, 0, 1, 'executive', GETDATE(), GETDATE()),
(3, 'Vendor', 0, 0, 1, 'vendor', GETDATE(), GETDATE());

SET IDENTITY_INSERT roles OFF;

COMMIT TRANSACTION;

-- Seed data for table: role_modules
BEGIN TRANSACTION;

DELETE FROM role_modules;

SET IDENTITY_INSERT role_modules ON;

INSERT INTO role_modules (id, name, slug, parent_id, created_at, updated_at)
VALUES
(1, 'Dashboard', 'dashboard', NULL, '2024-02-06 09:07:56', '2024-02-06 09:07:56'),
(2, 'Employee', 'employees', NULL, '2024-02-06 09:07:57', '2024-02-06 09:07:57'),
(3, 'Card Requests', 'card-requests', NULL, '2024-02-06 09:07:57', '2024-02-06 09:07:57'),
(4, 'Reports', 'reports', NULL, '2024-02-06 09:07:57', '2024-02-06 09:07:57'),
(5, 'User Settings', 'user-settings', NULL, '2024-02-06 09:07:58', '2024-02-06 09:07:58'),
(6, 'Users List', 'users', 5, '2024-02-06 09:07:58', '2024-02-06 09:07:58'),
(7, 'Roles', 'roles', 5, '2024-02-06 09:07:58', '2024-02-06 09:07:58');

SET IDENTITY_INSERT role_modules OFF;

COMMIT TRANSACTION;


-- Seed data for table: permissions
BEGIN TRANSACTION;

DELETE FROM permissions;

INSERT INTO permissions (role_id, module_id, is_read, is_write, is_delete, is_update, created_at, updated_at)
VALUES
(1, 1, 1, 1, 1, 1, '2024-02-06 09:12:12', '2024-02-06 09:12:12'),
(1, 2, 1, 1, 1, 1, '2024-02-06 09:12:12', '2024-02-06 09:12:12'),
(1, 3, 1, 1, 1, 1, '2024-02-06 09:12:12', '2024-02-06 09:12:12'),
(1, 4, 1, 1, 1, 1, '2024-02-06 09:12:13', '2024-02-06 09:12:13'),
(1, 5, 1, 1, 1, 1, '2024-02-06 09:12:13', '2024-02-06 09:12:13'),
(1, 6, 1, 1, 1, 1, '2024-02-06 09:12:13', '2024-02-06 09:12:13'),
(1, 7, 1, 1, 1, 1, '2024-02-06 09:12:13', '2024-02-06 09:12:13'),
(2, 2, 1, 1, 1, 1, '2024-02-06 09:12:12', '2024-02-06 09:12:12'),
(2, 3, 1, 1, 1, 1, '2024-02-06 09:12:12', '2024-02-06 09:12:12'),
(3, 3, 1, 1, 1, 1, '2024-02-06 09:12:13', '2024-02-06 09:12:13'),
(3, 4, 1, 1, 1, 1, '2024-02-06 09:12:13', '2024-02-06 09:12:13');

COMMIT TRANSACTION;

-- Seed data for table: users
BEGIN TRANSACTION;

DELETE FROM users;

SET IDENTITY_INSERT users ON;

INSERT INTO users (id, name, email, role_id, is_active, phone, created_at, updated_at,password)
VALUES
(1, 'Abhijit Chinkate', 'abhijit.chinkate@in.knightfrank.com', 1, 1, '+918976525321', GETDATE(), GETDATE(),'$2b$10$OlEN519BmgM/HlGjyvv/.OlO/XbIW0rtrWYrQIt7tRWlctTAqAe2O');

SET IDENTITY_INSERT users OFF;

COMMIT TRANSACTION;
