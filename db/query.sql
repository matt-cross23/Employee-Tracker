USE employee_db;
-- Read Tables
SELECT * FROM role

-- Create columns

-- Update Employee
UPDATE employee

-- Joins
SELECT * FROM employee
INNER JOIN role
ON employee.department_id = role.id

