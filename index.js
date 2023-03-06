const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./server')

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
    if (answers.options === 'View All Departments'){
        db.query('SELECT * FROM department', function (err, results) {
            if(err){
                console.error(err);
                return;
            }
            console.table(results);
            questions();
          });
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
            if(err){
                console.error(err);
                return;
            }
            console.log(`Added ${newDept.deptName} department to Database`);
            questions();
            });
    // } else if (answers.options === 'Delete Department'){
    //     // db.query('DELETE FROM department WHERE department.name = ?',[newDept.deptName], function (err, results) {
    //     //     console.log(`Added ${newDept.deptName} department to Database`);
    //         questions();
    //         });
    } else if (answers.options === 'View All Roles'){
        db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id', function (err, results) {
            if(err){
                console.error(err);
                return;
            }
            console.table(results);
            questions();
          });
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
            if(err){
                console.error(err);
                return;
            }
            console.log(`Added ${newRole.roleName} role to Database`);
            questions();
            });

    } else if (answers.options === 'View All Employees'){
        db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, employee.manager_id AS manager FROM employee JOIN role ON role.id = employee.role_id JOIN department ON role.department_id = department.id', function (err, results) {
            if(err){
                console.error(err);
                return;
            }
            console.table(results);
            questions();
          });
    }
    return;
};
questions()