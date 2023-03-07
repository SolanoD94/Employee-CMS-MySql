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
    E.employee.id,
    E.employee.first_name,
    E.employee.last_name,
    role.title AS role,
    department.name AS department,
    role.salary,
    M.employee.manager_id AS manager_id,
    M.employee.first_name AS manager_name
    FROM employee E
    JOIN role ON role.id = employee.role_id
    JOIN department ON role.department_id = department.id
    JOIN employee M ON E.employee.id = M.employee.manager_id