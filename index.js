const db = require('./db');
const inquirer = require('inquirer');
require("console.table");





const mainPrompts = function () {
    inquirer.prompt([
        {
        type: 'list',
        name: 'leadingQ',
        message: "What would you like to do?",
        choices: [
            'View All Employees', 
            'View All Roles', 
            'View All Departments',
            'Add Employees',
            'Add Department',
            'Add Role',
            'Update Employee Role',
            'Remove Employee'
        ]
      }
    ])
    .then(res => {
        let option = res.choice;
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
          case 'Update Employee Role':
              updateEmployeeRole();
              break; 
          case 'Remove Employee':
            removeEmployee();
            break;
          default:
            quit();
        }
      }
      )
    }
    
    // View all employees
    function viewEmployees() {
      db.findAllEmployees()
        .then(([rows]) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
        })
        .then(() => loadMainPrompts());
    }
    
    // View all employees that belong to a department
    function viewEmployeesByDepartment() {
      db.findAllDepartments()
        .then(([rows]) => {
          let departments = rows;
          const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
          }));
    
          prompt([
            {
              type: "list",
              name: "departmentId",
              message: "Which department would you like to see employees for?",
              choices: departmentChoices
            }
          ])
            .then(res => db.findAllEmployeesByDepartment(res.departmentId))
            .then(([rows]) => {
              let employees = rows;
              console.log("\n");
              console.table(employees);
            })
            .then(() => loadMainPrompts())
        });

}

mainPrompts()