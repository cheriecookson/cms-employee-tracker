const inquirer = require('inquirer');
require("console.table");
const connection = require("./db/db.js");


const mainPrompts = function () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: "What would you like to do?",
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'Add Employees',
                'Add Department',
                'Add Role',
                // 'Update Employee Role',
                // 'Remove Employee',
                'Quit'
            ]
        }
    ])
        .then(res => {
            let option = res.option;
            switch (option) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'Add Employees':
                    addEmployee();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                // case 'Update Employee Role':
                //     updateEmployeeRole();
                //     break;
                // case 'Remove Employee':
                //     removeEmployee();
                //     break;
                default:
                    quit();
            }
        }
        )
};

const viewEmployees = () => {
    console.log('Viewing all employees...\n');
    connection.query('SELECT * FROM employee', function (err, option) {
        if (err) throw err;
        console.table(option);
        mainPrompts();
    });
}

const viewRoles = () => {
    console.log('Viewing all roles...\n');
    connection.query('SELECT * FROM role', function (err, option) {
        if (err) throw err;
        console.table(option);
        mainPrompts();
    });
}

const viewDepartments = () => {
    console.log('Viewing all departments...\n');
    connection.query('SELECT * FROM department', function (err, option) {
        if (err) throw err;
        console.table(option);
        mainPrompts();
    });

}

// first_name, last_name, role_id, manager_id
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is your employee's first name?",
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is your employee's last name?",
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What is your employee's role id?",
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "What is your employee's manager's id?",
        }

    ])
        .then(res => {
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`
            // const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${res.first_name}', '${res.last_name}', ${res.role_id}, ${res.manager_id});`
            connection.query(query, Object.values(res), function (err, option) {
                if (err) throw err;
                console.table(option);
                mainPrompts();
            });
        })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the department name?",
        }
    ])
        .then(res => {
            const query = `INSERT INTO department (name) VALUES (?);`
            connection.query(query, Object.values(res), function (err, option) {
                if (err) throw err;
                console.table(option);
                mainPrompts();
            });
        })
}
//(title, salary, department_id)
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "What is the name of the role?",
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the annual salary for the role?",
        },
        {
            type: 'input',
            name: 'department_id',
            message: "What is the department id for the role?",
        }

    ])
        .then(res => {
            const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`
            connection.query(query, Object.values(res), function (err, option) {
                if (err) throw err;
                console.table(option);
                mainPrompts();
            });
        })
}

// const updateEmployeeRole = () => {
//     console.log('Updating employee role...\n');
//     connection.query('UPDATE role_id SET ? WHERE ?', function (err, option) {
//         if (err) throw err;
//         console.table(option);
//         mainPrompts();
//     });
// }


const quit = () => {
    process.exit(0);
}

mainPrompts();
