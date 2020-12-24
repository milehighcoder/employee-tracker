const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const logo = require("asciiart-logo");
const chalk = require("chalk");

//Application art logo
console.log(
  logo({
    name: "Employee Tracker",
    font: "ANSI SHADOW",
    lines: 8,
    padding: 2,
    margin: 2,
    borderColor: "cyan",
    logoColor: "cyan",
    textColor: "white",
  })
    .emptyLine()
    .right("version 1.0.00")
    .emptyLine()
    .center(
      "A command-line application that allows businesses to efficiently organize their employees, departments, roles, and managers seamlessly in an SQL database powered by JavaScript."
    )
    .render()
);

//Authentication for SQL
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "",
  password: "",
  database: "employee_trackerDB",
});

//Main menu prompt when application is invoked
const menu = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Delete Employee",
        "Delete Department",
        "Delete Role",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then(({ action }) => {
      switch (action) {
        case "View All Employees":
          return viewEmployees();
        case "View All Departments":
          return viewDepartments();
        case "View All Roles":
          return viewRoles();
        case "Add Employee":
          return addEmployee();
        case "Add Department":
          return addDepartment();
        case "Add Role":
          return addRole();
        case "Delete Employee":
          return deleteEmployee();
        case "Delete Department":
          return deleteDepartment();
        case "Delete Role":
          return deleteRole();
        case "Update Employee Role":
          return updateEmployeeRole();
        case "Exit":
          connection.end();
      }
    });
};

//View all current Employees
const viewEmployees = () => {
  console.clear();
  const sql =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary" +
    " FROM employee" +
    " inner join role ON (employee.role_id = role.id)" +
    " inner join department on role.department_id = department.id";
  connection.query(sql, [], function (err, res) {
    if (err) throw err;
    console.log(
      chalk.white(
        "-----------------------------------------------------------------------------"
      )
    );
    console.log("CURRENT EMPLOYEES");
    console.log(
      chalk.white(
        "-----------------------------------------------------------------------------"
      )
    );
    console.log("\n");
    console.table(res);
    console.log(
      chalk.cyan(
        "-----------------------------------------------------------------------------"
      )
    );
    console.log(
      chalk.cyan(
        "-----------------------------------------------------------------------------\n"
      )
    );
    menu();
  });
};

//View all current Departments
const viewDepartments = () => {
  console.clear();
  connection.query("SELECT * FROM department", function (error, res) {
    if (error) throw err;
    console.log(
      chalk.white(
        "-----------------------------------------------------------------------------"
      )
    );
    console.log("CURRENT DEPARTMENTS");
    console.log(
      chalk.white(
        "-----------------------------------------------------------------------------"
      )
    );
    console.log("\n");
    console.table(res);
    console.log(
      chalk.cyan(
        "-----------------------------------------------------------------------------"
      )
    );
    console.log(
      chalk.cyan(
        "-----------------------------------------------------------------------------\n"
      )
    );
    menu();
  });
};

//View all current Roles
const viewRoles = () => {
  console.clear();
  const sql =
    "SELECT role.id, role.title, role.salary, department.name as department" +
    " FROM role" +
    " inner join department ON (role.department_id = department.id)";
  connection.query(sql, [], function (err, res) {
    if (err) throw err;
    console.log(
      chalk.white(
        "-----------------------------------------------------------------------------"
      )
    );
    console.log("CURRENT ROLES");
    console.log(
      chalk.white(
        "-----------------------------------------------------------------------------"
      )
    );
    console.log("\n");
    console.table(res);
    console.log(
      chalk.cyan(
        "-----------------------------------------------------------------------------"
      )
    );
    console.log(
      chalk.cyan(
        "-----------------------------------------------------------------------------\n"
      )
    );
    menu();
  });
};

//Add an Employee
const addEmployee = () => {
  console.clear();
  let roleArray = [];
  const sql = "SELECT * FROM role";

  connection.query(sql, function (err, res) {
    if (err) throw err;
    roleArray = res;
    let roleNames = roleArray.map((user) => user.id + " " + user.title);

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
          choices: roleNames,
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
          ],
        },
      ])

      .then((answer) => {
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

        let result = JSON.stringify(answer.role_id);
        let resultId = result.replace(/\D/g, "");

        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: resultId,
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
  });
};

//Add a Department
const addDepartment = () => {
  console.clear();
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the department?",
        validate: (name) => {
          if (name) {
            return true;
          } else {
            console.log("\n Please enter a department name.");
            return false;
          }
        },
      },
    ])

    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        (err) => {
          if (err) throw err;
          console.table(`${answer.name} added to the database.`);
          menu();
        }
      );
    });
};

//Add a Role
const addRole = () => {
  console.clear();
  const roleTable =
    "SELECT role.id, role.title, department.name as department, role.salary" +
    " FROM role" +
    " inner join department on role.department_id = department.id";

  //Displays a table of the current Roles
  connection.query(roleTable, function (err, res) {
    if (err) throw err;
  });

  let depArray = [];
  const sql = "SELECT * FROM department";

  connection.query(sql, function (err, res) {
    if (err) throw err;
    depArray = res;
    let depNames = depArray.map((user) => user.id + " " + user.name);

    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title of the new role?",
          validate: (title) => {
            if (title) {
              return true;
            } else {
              console.log("\n Please enter a title for this role.");
              return false;
            }
          },
        },

        {
          name: "salary",
          type: "input",
          message: "What is the salary of this role?",
          validate: (salary) => {
            if (salary) {
              return true;
            } else {
              console.log("\n Please enter a salary for this role.");
              return false;
            }
          },
        },

        {
          name: "dept_id",
          type: "list",
          message: "Which department will this role be in",
          choices: depNames,
        },
      ])

      .then((answer) => {
        let result = JSON.stringify(answer.dept_id);
        let resultId = result.replace(/\D/g, "");
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: resultId,
          },
          (err) => {
            if (err) throw err;
            console.table(`${answer.title} added to the database.`);
            menu();
          }
        );
      });
  });
};

//Delete an employee
const deleteEmployee = () => {
  console.clear();
  let empArray = [];
  const sql =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary" +
    " FROM employee" +
    " inner join role ON (employee.role_id = role.id)" +
    " inner join department on role.department_id = department.id";

  connection.query(sql, function (err, res) {
    if (err) throw err;
    empArray = res;
    let empNames = empArray.map(
      (user) => user.id + " " + user.first_name + " " + user.last_name
    );

    inquirer
      .prompt([
        {
          name: "employee_delete",
          type: "list",
          message: "Which employee would you like to delete?",
          choices: empNames,
        },
      ])
      .then((answer) => {
        let result = JSON.stringify(answer.employee_delete);
        let resultId = result.replace(/\D/g, "");
        connection.query(`DELETE FROM employee WHERE id=${resultId}`, (err) => {
          if (err) throw err;
          console.log(`${answer.employee_delete} has been deleted.`);
          menu();
        });
      });
  });
};

//Delete a Department
const deleteDepartment = () => {
  console.clear();
  let depArray = [];
  const sql = "SELECT * FROM department";

  connection.query(sql, function (err, res) {
    if (err) throw err;
    depArray = res;
    let depNames = depArray.map((user) => user.id + " " + user.name);

    inquirer
      .prompt([
        {
          name: "department_delete",
          type: "list",
          message: "Which department would you like to delete?",
          choices: depNames,
        },
      ])
      .then((answer) => {
        let result = JSON.stringify(answer.department_delete);
        let resultId = result.replace(/\D/g, "");
        connection.query(
          `DELETE FROM department WHERE id=${resultId}`,
          (err) => {
            if (err) throw err;
            console.log(`${answer.department_delete} has been deleted.`);
            menu();
          }
        );
      });
  });
};

//Delete a Role
const deleteRole = () => {
  console.clear();
  let roleArray = [];
  const sql =
    "SELECT role.id, role.title, role.department_id, department.name as department, role.salary" +
    " FROM role" +
    " inner join department on role.department_id = department.id";

  connection.query(sql, function (err, res) {
    if (err) throw err;
    roleArray = res;
    let roleNames = roleArray.map((user) => user.id + " " + user.title + " ");

    inquirer
      .prompt([
        {
          name: "role_delete",
          type: "list",
          message: "Which role would you like to delete?",
          choices: roleNames,
        },
      ])
      .then((answer) => {
        let result = JSON.stringify(answer.role_delete);
        let resultId = result.replace(/\D/g, "");
        connection.query(`DELETE FROM role WHERE id=${resultId}`, (err) => {
          if (err) throw err;
          console.log(`${answer.role_delete} has been deleted.`);
          menu();
        });
      });
  });
};

//Update an Employee's Role
const updateEmployeeRole = () => {
  console.clear();
  let empArray = [];
  let roleArray = [];

  const sql =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary" +
    " FROM employee" +
    " inner join role ON (employee.role_id = role.id)" +
    " inner join department on role.department_id = department.id";

  const sql2 = "SELECT role.title, role.id FROM role";

  connection.query(sql, function (err, res) {
    if (err) throw err;
    empArray = res;
    let empNames = empArray.map(
      (user) => user.id + " " + user.first_name + " " + user.last_name
    );

    inquirer
      .prompt([
        {
          name: "employee_name",
          type: "list",
          message: "Which employee would you like to update?",
          choices: empNames,
        },
      ])
      .then((answer) => {
        connection.query(sql2, function (err, res) {
          let nameSuccess = answer.employee_name;
          let result = JSON.stringify(answer.employee_name);
          let resultId = result.replace(/\D/g, "");
          if (err) throw err;
          roleArray = res;
          let roleList = roleArray.map((roles) => roles.id + " " + roles.title);
          inquirer
            .prompt([
              {
                type: "list",
                message: "What would you like to change their role to?",
                name: "newEmpRole",
                choices: roleList,
              },
            ])
            .then((answer) => {
              let role = JSON.stringify(answer.newEmpRole);
              let newRole = role.replace(/\D/g, "");
              connection.query(
                `UPDATE employee SET role_id = ${newRole} WHERE id = ${resultId}`,
                function (err, res) {
                  if (err) throw err;
                }
              );

              const sql =
                "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary" +
                " FROM employee" +
                " inner join role ON (employee.role_id = role.id)" +
                " inner join department on role.department_id = department.id";
              connection.query(sql, [], function (err, res) {
                if (err) throw err;
                console.log(`${nameSuccess} has been updated.`);
                menu();
              });
            });
        });
      });
  });
};

//Connects SQL database
connection.connect((err) => {
  if (err) throw err;
  // console.log(`Connected at ${connection.threadId}`);
  menu();
});
