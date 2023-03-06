--Query for View All Departments--
SELECT * 
    FROM department

--Query for View All Roles--
SELECT
    role.id,
    role.title,
    department.name AS department,
    role.salary 
    FROM role 
    JOIN department 
    ON role.department_id = department.id
    
--Query for View All Employees--
 SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title AS role,
    department.name AS department,
    role.salary,
    employee.manager_id AS manager
    FROM employee
    JOIN role ON role.id = employee.role_id
    JOIN department ON role.department_id = department.id
    --missing link between Employee and Manager