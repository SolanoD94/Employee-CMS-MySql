const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./server');
let dept_db = [];
let roles_db = [];
let employee_db = [];

// Questions to be prompted
const questions = async () => {
    const answers = await inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: ['View All Departments', 'Add Department', 'Delete Department', 'View All Roles', 'Add Role', 'View All Employees', 'Add Employee']
        }
    ])

// View All Departments 
    if (answers.options === 'View All Departments'){
        db.query('SELECT * FROM department', function (err, results) {
            if (err) throw err;
            console.table(results);
            questions();
          });

// Add Department
    } else if (answers.options === 'Add Department'){
        const newDept = await inquirer
        .prompt([
            {
                type: 'input',
                message: 'Name of the new Department',
                name: 'deptName',
            }
        ]);
        console.log(newDept);
        db.query('INSERT INTO department (name) VALUES (?)',[newDept.deptName], function (err, results) {
            if (err) throw err;
            console.log(`Added ${newDept.deptName} department to Database`);
            questions();
            });

// Delete Department
    } else if (answers.options === 'Delete Department'){
        const deptName = await inquirer
        .prompt([
            {
                type: 'input',
                message: 'What department do you want to delete?',
                name: 'deptName',
            }
        ]);
        db.query('DELETE FROM department WHERE department.name = (?)',[deptName.deptName], function (err, results) {
            if (err) throw err;
            console.log(`${deptName.deptName} department has been removed from Database`);
            questions();
            });

// View All Roles
    } else if (answers.options === 'View All Roles'){
        db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id', function (err, results) {
            if (err) throw err;
            console.table(results);
            questions();
          });

// Add Role
    } else if (answers.options === 'Add Role'){

        const newRole = await inquirer
        .prompt([
            {
                type: 'input',
                message: 'Name of the Role:',
                name: 'roleName',
            },
            {
                type: 'number',
                message: 'What is the salary of the new role?',
                name: 'roleSalary',
            },
            {
                type: 'list',
                message: 'Which department does the new Role belong to?',
                name: 'roleDept',
                choices:['Sales', 'Engineering', 'Finance', 'Legal']
            }
        ]);
        console.log(newRole);
        const values = [newRole.roleName, newRole.roleSalary, newRole.roleDept];
        console.log(values);
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?)', [values], function (err, results) {
            if (err) throw err;
            console.log(`Added ${newRole.roleName} role to Database`);
            questions();
            });

// View All Employees
    } else if (answers.options === 'View All Employees'){
        db.query('SELECT E.employee.id, E.employee.first_name, E.employee.last_name, role.title AS role, department.name AS department, role.salary, M.employee.manager_id AS manager_id, M.employee.first_name AS manager_name FROM employee E JOIN role ON role.id = employee.role_id JOIN department ON role.department_id = department.id JOIN employee M ON E.employee.id = M.employee.manager_id', function (err, results) {
            if (err) throw err;
            console.table(results);
            questions();
          });

// Add Employee
    } else if (answers.options === 'Add Employee'){

        db.query('SELECT * FROM role', function (err, results) {
            if (err) throw err;
            console.table(results);
            roles_db = results.map(role => role.title);
            
            console.log(roles_db);
        });
        console.log("hola" + roles_db);
        const newEmployee = await inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the employee`s first name?',
                name: 'employeeFirstName',
            },
            {
                type: 'input',
                message: 'What is the employee`s last name?',
                name: 'employeeLastName',
            },
            {
                type: 'list',
                message: 'What is the employee`s role?',
                name: 'employeeRole',
                choices: roles_db
            },
            {
                type: 'list',
                message: 'Who is the employee`s manager?',
                name: 'employeeManager',
                choices:['John', 'Kim']
            }
        ]);
        
        console.log(newEmployee);
        const values = [newEmployee.employeeFirstName, newEmployee.employeeLastName, newEmployee.employeeRole, newEmployee.employeeManager];
        //console.log(values);
        
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)', [values], function (err, results) {
            if (err) throw err;
            console.log(`Added ${newEmployee.employeeFirstName} ${newEmployee.employeeLastName} to Database`);
            questions();
            });
        }return;
};
questions()