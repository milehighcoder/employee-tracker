const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

//connection information
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "RebelUnlv15*",
  database: "employee_trackerDB",
});

// this function kicks off the command line application and begins the prompts
const menu = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit",
      ],
    })
    .then(({ action }) => {
      // console.log(action)
      //switch case that runs depending on the user's choices selection
      switch (action) {
        case "View All Employees":
          return viewEmployees();
        case "View All Employees By Department":
          return viewEmployeesDept();
        case "View All Employees By Manager":
          return viewEmployeesManager();
        case "Add Employee":
          return addEmployee();
        case "Remove Employee":
          return removeEmployee();
        case "Update Employee Role":
          return updateEmployeeRole();
        case "Update Employee Manager":
          return updateEmployeeManager();
        case "Exit":
          connection.end();
      }
    });
};

const viewEmployees = () => {};

const viewEmployeesDept = () => {};

const viewEmployeesManager = () => {};

const addEmployee = () => {};

const removeEmployee = () => {};

const updateEmployeeRole = () => {};

const updateEmployeeManager = () => {};

//connects to database
connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
  menu();
});
