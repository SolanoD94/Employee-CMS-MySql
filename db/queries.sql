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
    CONCAT(employee.first_name , " ", employee.last_name) AS employee
    role.title AS role,
    department.name AS department,
    role.salary,
    CONCAT(manager.first_name, " ", manager.last_name) AS manager_name
    FROM employee
    LEFT JOIN role ON role.id = employee.role_id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id