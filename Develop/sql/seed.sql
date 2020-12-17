DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE employee(
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT NULL,
manager_id INT NULL
);

CREATE TABLE role(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT
);

CREATE TABLE department(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

SELECT * FROM role;

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", "100000", 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", "150000", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", "130000", 2);

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Administration");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Howard", "Brown", 3, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lon", "Kruger", 5, 2);
