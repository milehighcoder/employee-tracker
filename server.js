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

const viewEmployees = () => {
  connection.query("SELECT * FROM employee", function (error, res) {
    if (error) throw err;
    console.log(res);
  });
  connection.end();
};

const viewEmployeesDept = () => {};

const viewEmployeesManager = () => {};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
        validate: (first_name) => {
          if (first_name) {
            return true;
          } else {
            console.log("\n Please enter a first name.");
            return false;
          }
        },
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
        validate: (last_name) => {
          if (last_name) {
            return true;
          } else {
            console.log("\n Please enter a last name.");
            return false;
          }
        },
      },
      {
        name: "role_id",
        type: "list",
        message: "What is the employee's role?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
        ],
      },
      {
        name: "manager_id",
        type: "list",
        message: "Who is the employee's manager?",
        choices: [
          "None",
          "Thomas Shelby",
          "Arthur Shelby",
          "John Shelby",
          "Poly Gray",
          "Michael Gray",
        ],
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee SET first_name=?, last_name=?, role_id?, manager_id=?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        (err) => {
          if (err) throw err;
          console.log(`Added ${first_name} ${last_name} to the database.`);
          menu();
        }
      );
    });
};

const removeEmployee = () => {};

const updateEmployeeRole = () => {};

const updateEmployeeManager = () => {};

//connects to database
connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
  menu();
});
