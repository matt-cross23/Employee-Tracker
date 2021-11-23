const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const PORT = process.env.PORT || 3001;
const app = express();
const table = require("console.table");
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Rootroot",
    database: "employee_db",
  },
  console.log("connected to employee_db")
);

const startQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "View All Employees",
      "Quit",
    ],
    name: "menu",
  },
];
const addDepartment = [
  {
    type: "input",
    message: "What is the id of the role?",
    name: "roleId",
  },
  {
    type: "input",
    message: "What is the name of the department?",
    name: "deptName",
  },
];
const addRole = [
  {
    type: "input",
    message: "What's the ID for the role?",
    name: "roleId",
  },
  {
    type: "input",
    message: "What is the name of the role?",
    name: "roleName",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "roleSalary",
  },
  {
    type: "input",
    message: "Which department does the role belong to?",
    name: "roleDept",
  },
];
const addEmployee = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "employeeFirst",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "employeeLast",
  },
  {
    type: "input",
    message: "What is the employee's role?",
    name: "employeeRole",
  },
  {
    type: "input",
    message: "Who is the employee's manager",
    name: "employeeManager",
  },
];
const updateEmployee = [
  {
    type: "list",
    message: "Which employee's role do you want to update?",
    choices: [""],
  },
  {
    type: "list",
    message: "Which role do you want to assgin the selected emoloyee?",
    choices: [""],
  },
];
function menuPrompt() {
  inquirer.prompt(startQuestions).then((answers) => {
    console.log(answers.menu);
    switch (answers.menu) {
      case "View All Employees":
        db.query("SELECT * FROM employee", function (err, results) {
          console.table(results);
        });
        break;
      case "View All Roles":
        db.query("SELECT * FROM role", function (err, results) {
          console.table(results);
        });
        break;
      case "View All Departments":
        db.query("SELECT * FROM departments;", function (err, results) {
          console.table(results);
        });
        break;
      case "Add Employee":
        inquirer.prompt(addEmployee).then((answers) => {
          console.log(answers);
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            Values (?)`;
          const params = [
            [answers.employeeFirst],
            [answers.employeeLast],
            [answers.employeeRole],
            [answers.employeeManager],
          ];
          db.query(sql, [params], (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("success");
          });
        });
        break;
      case "Add Department":
        inquirer.prompt(addDepartment).then((answers) => {
          const sql = `INSERT INTO departments(id, name) 
            Values (?)`;
          const params = [[answers.deptId], [answers.deptName]];
          db.query(sql, [params], (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("success");
          });
        });
      case "Add Role":
        inquirer.prompt(addRole).then((answers) => {
          const sql = `INSERT INTO role(id, title, salary, department_id) 
            Values (?)`;
          const params = [
            [answers.roleId],
            [answers.roleName],
            [answers.roleSalary],
            [answers.roleDept],
          ];
          db.query(sql, [params], (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("success");
          });
        });
        // Update Employee Role`
      //   case "Update Employee Role":
      //       inquirer.prompt(updateEmployee).then((answers) =>{
      //     updateData = {}
      //       updateEmployees(answers);
      //  break;

      // });
      default:
        console.log("Thanks for using the database!");
    }
  });
}

function init() {
  menuPrompt();
  //   inquirer.prompt(startQuestions).then((answers) => {
  //     menuPrompt();
  //   });
}
init();
