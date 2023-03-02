INSERT INTO department (id, name)
VALUES 
    (1, "Sales"),
    (2, "Engineering"),
    (3, "Finance"),
    (4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, "Sales Lead", 100000, 1),
    (2, "Salesperson", 80000, 1),
    (3, "Lead Engineer", 150000, 2),
    (4, "Software Engineer", 120000, 2),
    (5, "Account Manager", 160000, 3),
    (6, "Accountant", 125000, 3),
    (7, "Legal Team Lead", 250000, 4),
    (8, "Lawyer", 190000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "John", "Johnson", 1, NULL),
    (2, "Mike", "Dawson", 1, 1),
    (3, "Ashley", "Brook", 2, NULL),
    (4, "Kevin", "Sing", 2, 3),
    (5, "Kim", "Klark", 3, NULL),
    (6, "Steph", "Zehenny", 3, 5),
    (7, "Sara", "Lopez", 4, NULL),
    (8, "Tom", "Allen", 4, 7);