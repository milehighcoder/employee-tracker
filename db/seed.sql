INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", "60000", 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", "80000", 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", "100000", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Software Engineer", "130000", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Director of Operations", "150000", 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Chief Executive Officer", "200000", 3);

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Administration");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Thomas", "Shelby", 6, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Arthur", "Shelby", 5, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Shelby", 4, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Poly", "Gray", 2, 5);