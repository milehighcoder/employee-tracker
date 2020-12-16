const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

//connection information
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "RebelUnlv15*",
  database: "employee_trackerDB",
});

//this function kicks off the command line application and begins the prompts
// const menu = () => {
//   inquirer
//     .prompt({
//       type: "list",
//       message: "What would you like to do?",
//       name: "action",
//       choices: [
//         "Enter User Information",
//         "Choice 2",
//         "Choice 3",
//         "Choice 4",
//         "Exit",
//       ],
//     })
//     .then(({ action }) => {
//       // console.log(action)
//       //switch case that runs depending on the user's choices selection
//       switch (action) {
//         case "Enter User Information":
//           return userInfo();
//         case "Choice 2":
//           return choice2();
//         case "Choice 3":
//           return choice3();
//         case "Choice 4":
//           return choice4();
//         case "Exit":
//           connection.end();
//       }
//     });
// };

// const userInfo = () => {
//   // console.log('choice1 function is kicked off!');
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         message: "What is your first name?",
//         name: "firstName",
//       },
//       {
//         type: "input",
//         message: "What is your last name?",
//         name: "lastName",
//       },
//       {
//         type: "input",
//         message: "What is your email address?",
//         name: "email",
//       },
//       {
//         type: "input",
//         message: "What is your phone number?",
//         name: "phone",
//       },
//     ])
//     .then((answer) => {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO users SET ?",
//         {
//           firstName: answer.firstName,
//           lastName: answer.lastName,
//           email: answer.email,
//           phone: answer.phone,
//         },
//         (err) => {
//           if (err) throw err;
//           console.log("User information successfully created");
//           menu();
//         }
//       );
//     });
// };

const choice2 = () => {};

const choice3 = () => {};

const choice4 = () => {};

//connects to database
connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
//   menu();
});
