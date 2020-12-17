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
      if (answer.role_id == "Sales Lead") {
        roleID = 1;
      }
      if (answer.role_id == "Salesperson") {
        roleID = 2;
      }
      if (answer.role_id == "Lead Engineer") {
        roleID = 3;
      }
      if (answer.role_id == "Software Engineer") {
        roleID = 4;
      }
      if (answer.role_id == "Account Manager") {
        roleID = 5;
      }
      if (answer.role_id == "Accountant") {
        roleID = 6;
      }
      if (answer.role_id == "Legal Team Lead") {
        roleID = 7;
      }

      // console.log(roleID);

      if (answer.manager_id == "none") {
        managerID = 1;
      }
      if (answer.manager_id == "Thomas Shelby") {
        managerID = 2;
      }
      if (answer.manager_id == "Arthur Shelby") {
        managerID = 3;
      }
      if (answer.manager_id == "John Shelby") {
        managerID = 4;
      }
      if (answer.manager_id == "Poly Gray") {
        managerID = 5;
      }
      if (answer.manager_id == "Michael Gray") {
        managerID = 6;
      }

      // console.log(managerID);

      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: roleID,
          manager_id: managerID,
        },
        (err) => {
          if (err) throw err;
          console.log("Employee added to the database.");
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
