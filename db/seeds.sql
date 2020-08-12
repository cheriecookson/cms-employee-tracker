use employee_trackerDB;

INSERT INTO department 
    (name)
VALUES
    ('Sales'),
    ('Accounting'),
    ('Legal'),
    ('Engineering');

INSERT INTO role 
    (title, salary, department_id)
VALUES
    ('Lawyer', 120000, 3),
    ('Accountant', 90000, 2),
    ('Salesperson', 85000, 1),
    ('Engineer', 150000, 4);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Doe', 4, NULL),
    ('Inspector', 'Gadgit', 3, NULL),
    ('Donna', 'Reed', 2, NULL);