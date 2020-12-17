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

//app start menu
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
        case "Update Employee Role":
          return updateEmployeeRole();
        case "Exit":
          connection.end();
      }
    });
};

//allows the user to view all employees currently in the database
const viewEmployees = () => {
  const sql =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary" +
    //, CONCAT(e.first_name, ' ', e.last_name) as manager
    " FROM employee" +
    " inner join role ON (employee.role_id = role.id)" +
    " inner join department on role.department_id = department.id";
  //+ " left join employee as e on employee.manager_id = e.id";
  connection.query(sql, [], function (error, res) {
    if (error) throw err;
    //console.table npm displays tables in a nicer format in the console
    console.table(res);
    menu();
  });
};

//allows the user to view all departments currently in the datable
const viewDepartments = () => {
  connection.query("SELECT * FROM department", function (error, res) {
    if (error) throw err;
    console.table(res);
    menu();
  });
};

//allows the user to view all roles currently in the datable
const viewRoles = () => {
  const sql =
    "SELECT role.id, role.title, role.salary, department.name as department" +
    " FROM role" +
    " inner join department ON (role.department_id = department.id)";
  connection.query(sql, [], function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
};

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
          "Sales Associate",
          "Sales Manager",
          "Software Engineer",
          "Lead Software Engineer",
          "Director of Operations",
          "Chief Executive Officer",
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
        ],
      },
    ])

    //takes the user's answers and then sends them to the sql database
    .then((answer) => {
      //these if statements assign an id number to the role that is selected by the user
      if (answer.role_id == "Sales Associate") {
        roleID = 1;
      }
      if (answer.role_id == "Sales Manager") {
        roleID = 2;
      }
      if (answer.role_id == "Software Engineer") {
        roleID = 3;
      }
      if (answer.role_id == "Lead Software Engineer") {
        roleID = 4;
      }
      if (answer.role_id == "Director of Operations") {
        roleID = 5;
      }
      if (answer.role_id == "Chief Executive Officer") {
        roleID = 6;
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

//allows the user to create a new department
const addDepartment = () => {
  inquirer
    .prompt([
      //department name prompt
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

//allows the user to create a new role
const addRole = () => {
  inquirer
    .prompt([
      //title prompt
      {
        name: "title",
        type: "input",
        message: "What is the title of this role?",
        validate: (title) => {
          if (title) {
            return true;
          } else {
            console.log("\n Please enter a title for this role.");
            return false;
          }
        },
      },

      //salary prompt
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

      //department id prompt
      {
        name: "dept_id",
        type: "list",
        message: "Which department will this role be in",
        choices: [
          "Sales",
          "Engineering",
          "Administration",
          "Accounting",
          "Marketing",
          "Human Resources",
        ],
      },
    ])

    //takes the user's answers and then sends them to the sql database
    .then((answer) => {
      if (answer.dept_id == "Sales") {
        deptID = 1;
      }
      if (answer.dept_id == "Engineering") {
        deptID = 2;
      }
      if (answer.dept_id == "Administration") {
        deptID = 3;
      }
      if (answer.dept_id == "Accounting") {
        deptID = 4;
      }
      if (answer.dept_id == "Marketing") {
        deptID = 5;
      }
      if (answer.dept_id == "Human Resources") {
        deptID = 6;
      }

      //connects to sql database and inserts the user's answers into the role table
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: deptID,
        },
        (err) => {
          if (err) throw err;
          console.table(`${answer.title} added to the database.`);
          menu();
        }
      );
    });
};

const updateEmployeeRole = () => {
  /*
  1. Get all employees to show as a menu.
  2. Select the new role id for the selected employee
  3. Insert the new role into the database in place of the old role
  */

  inquirer
    .prompt([
      //employee name prompt
      {
        name: "employee_name",
        type: "list",
        message: "Which employee would you like to update?",
        choices: [], //create an array outside of this function that collects all the employee last names
      },
      //update role prompt
      {
        name: "new_role",
        type: "list",
        message: "What would you like the selected employee's new role to be?",
        choices: [
          "Sales Associate",
          "Sales Manager",
          "Software Engineer",
          "Lead Software Engineer",
          "Director of Operations",
          "Chief Executive Officer",
        ],
      },
    ])
    .then((answer) => {
      //these if statements assign an id number to the role that is selected by the user
      if (answer.new_role == "Sales Associate") {
        roleID = 1;
      }
      if (answer.new_role == "Sales Manager") {
        roleID = 2;
      }
      if (answer.new_role == "Software Engineer") {
        roleID = 3;
      }
      if (answer.new_role == "Lead Software Engineer") {
        roleID = 4;
      }
      if (answer.new_role == "Director of Operations") {
        roleID = 5;
      }
      if (answer.new_role == "Chief Executive Officer") {
        roleID = 6;
      }

      //connects to sql database and inserts the user's answers into the employee table
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.employee_name,
          role_id: roleID,
        },
        (err) => {
          if (err) throw err;
          console.table(
            `${answer.first_name} ${answer.employee_name} added to the database.`
          );
          menu();
        }
      );
    });
};

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
  menu();
});
