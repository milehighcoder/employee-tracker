const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "RebelUnlv15*",
  database: "employee_trackerDB",
});

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

//allows the user to view all employees currently in the database
const viewEmployees = () => {
  connection.query("SELECT * FROM employee", function (error, res) {
    if (error) throw err;
    //console.table npm displays tables in a nicer format in the console
    console.table(res);
    menu();
  });
};

const viewEmployeesDept = () => {};

const viewEmployeesManager = () => {};

//allows the user to create a new employee
const addEmployee = () => {
  inquirer
    .prompt([
      //first name prompt
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

      //last name prompt
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

      //role prompt
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

      //manager prompt
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

    //takes the user's answers and then sends them to the sql database
    .then((answer) => {
      //these if statements assign an id number to the role that is selected by the user
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

      //these if statements assign an id number to the manager that is selected by the user
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

      //connects to sql database and inserts the user's answers into the employee table
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
          console.table(
            `${answer.first_name} ${answer.last_name} added to the database.`
          );
          menu();
        }
      );
    });
};

const removeEmployee = () => {};

const updateEmployeeRole = () => {};

const updateEmployeeManager = () => {};

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
  menu();
});
