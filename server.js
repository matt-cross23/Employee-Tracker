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
    message: "What is the id of the department?",
    name: "deptId",
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
    message: "What is the employee's role ID #?",
    name: "employeeRole",
  },
  {
    type: "input",
    message: "What's the employee's manager ID #",
    name: "employeeManager",
  },
  
];
const updateEmployee = [
  {
    type: "list",
    message: "Which employee's role do you want to update?",
    choices: ()=>{
      return db.query(`SELECT * FROM employee`)
    },
    name: "newName"
  },
  {
    type: "list",
    message: "Which role do you want to assign the selected emoloyee?",
    choices: [],
    name: "newRole"
  },
];
function menuPrompt() {
  inquirer.prompt(startQuestions).then((answers) => {
    console.log(answers.menu);
    switch (answers.menu) {
      case "View All Employees":
        db.query(` SELECT employee.first_name, employee.last_name, role.title ,role.salary, departments.name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager from employee_db.employee
        left join role on employee.role_id = role.id
        left join departments on role.department_id = departments.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id;`, function (err, results) {
          console.table(results);

          init();
        });
        
        break;
      case "View All Roles":
        db.query("SELECT * FROM role", function (err, results) {
          console.table(results);
          init();
        });
        
        break;
      case "View All Departments":
        db.query("SELECT * FROM departments;", function (err, results) {
          console.table(results);
          init();
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
            init();
          });
        });
        
        break;
      case "Add Department":
        inquirer.prompt(addDepartment).then((answers) => {
          const sqlDept = `INSERT INTO departments (id, name) 
            Values (?)`;
          const params = [[answers.deptId], [answers.deptName]];
          db.query(sqlDept, [params], (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("success");
            init();
          });
        });
        
        break;
      case "Add Role":
        inquirer.prompt(addRole).then((answers) => {
          const sqlRole = `INSERT INTO role (id, title, salary, department_id) 
            Values (?)`;
          const params = [
            [answers.roleId],
            [answers.roleName],
            [answers.roleSalary],
            [answers.roleDept],
          ];
          db.query(sqlRole, [params], (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("success");
            init();
          });
        });
        
        break;
        case "Update Employee Role":
           inquirer.prompt(updateEmployee).then((answers) =>{
             console.log(answers)
              init();
            });
       break;
      default:
        console.log("Thanks for using the database!");
    }
  });
}

function init() {
  menuPrompt();
}
init();
