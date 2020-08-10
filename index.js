const db = require('./db');
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require("./db/db.js");




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
            'Update Employee Role'
        ]
      }
    ])
}

mainPrompts()