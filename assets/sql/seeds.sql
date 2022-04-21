INSERT INTO departments (name)
VALUES ("Math"),
       ("Science"),
       ("History"),
       ("PhysEd");

INSERT INTO roles (title, salary, department_id)
VALUES ("Teacher", "45000", "1"),
       ("Admin", "55000", "3"),
       ("Intern", "35000", "4"), 
       ("Janitor", "40000", "2");

INSERT INTO employees (id, first_name, last_name, manager_id, role_id)
VALUES ("7", "John", "Smith", NULL, "3"),
       ("8", "Joe", "Jones", "7", "1"),
       ("9", "Betty", "White", "7", "1"),
       ("10", "Rob", "Johnson", "7", "1");
       