const express  = require('express')
const mysql = require('mysql2');
const inquirer = require('inquirer')
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({extended: false}));
const 

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Rootroot',
        database : 'employee_db'


    },
    console.log('connected to employee_db')
);

const startQuestions = [
    {
       type: "list",
       message: "What would you like to do?",
       choices: ["View All Employees", "Update Employee Role", "View all Roles", "Add Role", "View All Departments", "Add Department", "View All Employees", "Quit"],
       name: "menu"
    },
    ]
  const addDepartment = [
      {
       type: "input",
       message: "What is the name of the department?",
       name: "deptName"
      },
    ]
  const addRole = [
      {
       type: "input",
       message: "What is the name of the role?",
       name: "roleName"
      },
      {
       type: "input",
       message: "What is the salary of the role?",
       name: "roleSalary"
      },
       {
        type: "list",
        message: "Which department does the role belong to?",
        choices: ["Test1", "Test2"]
    ]
  const addEmployee = [
       {
       type: "input",
       message: "What is the employee's first name?",
       name: "employeeFirst"
      },
       {
       type: "input",
       message: "What is the employee's last name?",
       name: "employeeLast"
      },
      {
      type: "list",
      message: "What is the employee's role?",
      choices: [""]
      name: "employeeRole"
      },
      {type : "input",
       message: "Who is the employee's manager",
       name: "employeeManager"
      },
   ]
  const updateEmployee =[
      {type: "list",
       message: "which employee's role do you want to update?",
       choices: [""]
      },
      {type: "list",
       message: "Which role do you want to assgin the selected emoloyee?",
       choices: [""]
   ]
