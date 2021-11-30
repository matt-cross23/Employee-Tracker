USE employee_db;
-- Read Tables
SELECT * FROM role

-- Create rows
INSERT INTO employee (first_name, last_name, role_id, manager_id) AT VALUES (?)

-- Update Employee
UPDATE employee

-- Joins
SELECT * FROM employee
INNER JOIN role
ON employee.department_id = role.id

