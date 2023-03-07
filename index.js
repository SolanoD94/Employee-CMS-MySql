const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./server');

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
        db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
            if (err) throw err;
            console.table(results);
            questions();
          });

// Add Role
    } else if (answers.options === 'Add Role'){

        //Populates role_db with the role titles from table "role" to prompt in choices.
        const results = await db.promise().query('SELECT * FROM department');
        const dept_db = results[0].map(department =>{
            return {
                name: department.name,
                value: department.id
            }
        } );

        const newRole = await inquirer
        .prompt([
            {
                type: 'input',
                message: 'Name of the Role:',
                name: 'roleName',
            },
            {
                type: 'list',
                message: 'Which department does the new Role belong to?',
                name: 'roleDept',
                choices: dept_db
            },
            {
                type: 'number',
                message: 'What is the salary of the new role?',
                name: 'roleSalary',
            }
        ]);
        console.log(newRole);
        const values = [newRole.roleName, newRole.roleDept, newRole.roleSalary];
        console.log(values);
        db.query('INSERT INTO role (title, department_id, salary) VALUES (?)', [values], function (err, results) {
            if (err) throw err;
            console.log(`Added ${newRole.roleName} role to Database`);
            questions();
            });

            // View All Employees
    } else if (answers.options === 'View All Employees'){
        db.query('SELECT employee.id, CONCAT(employee.first_name , " ", employee.last_name) AS employee, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id', function (err, results) {
            if (err) throw err;
            console.table(results);
            questions();
          });

// Add Employee
    } else if (answers.options === 'Add Employee'){

        //Populates role_db with the role titles from table "role" to prompt in choices.
        const results = await db.promise().query('SELECT * FROM role');
        const roles_db = results[0].map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
        });

        //Populates managers_db with the first names of employees from table "employee" to prompt in choices.
        const choices = await db.promise().query('SELECT * FROM employee');
        const managers_db = choices[0].map(employee => {
            return {
                name: employee.first_name +" "+ employee.last_name,
                value: employee.id
            }
        });

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
                choices: managers_db
            }
        ]);
        
        console.log(newEmployee);
        const values = [newEmployee.employeeFirstName, newEmployee.employeeLastName, newEmployee.employeeRole, newEmployee.employeeManager];
        
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)', [values], function (err, results) {
            if (err) throw err;
            console.log(`Added ${newEmployee.employeeFirstName} ${newEmployee.employeeLastName} to Database`);
            questions();
            });
        }return;
};
questions()
