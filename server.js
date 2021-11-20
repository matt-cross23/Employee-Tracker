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
        message: "What would you like to do",
        choices: ["View All Employees", "Update Employee Role", "View all Roles", "Add Role", "View All Departments", "Add Department", "View All Employees", "Quit"],
         name: "menu"
    },
]
  const departmentQuestions = [
      {
        
      },
  ]