const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yellowdog34',
    database: 'company_db'
});

const askUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'mainOptions',
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add department",
                "Add role",
                "Add Employee",
                "Update employee role"
            ]
        }])

        .then((answer) => {
            switch (answer.mainOptions) {
                case "View all departments":
                    showDepts();
                    break;

                case "View all roles":
                    showRoles();
                    break;

                case "View all employees":
                    showEmployees();
                    break;

                case "Add department":
                    addDept();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Update employee role":
                    updateRole();
                    break;
            }
        }
        )

};

const showDepts = () => {
    db.query('SELECT * FROM departments', function (err, response) {
        console.table(response)
        if (err) console.log(err)
        askUser();
    })
};

const showRoles = () => {
    db.query('SELECT * FROM roles', function (err, response) {
        console.table(response)
        if (err) console.log(err)
        askUser();
    })
};

const showEmployees = () => {
    db.query('SELECT * FROM employees', function (err, response) {
        console.table(response)
        if (err) console.log(err)
        askUser();
    })
};

const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new department name?',
            name: 'newDeptName'

        }
    ])
        .then((response) => {
            db.query(`INSERT INTO departments (name) VALUES ("${response.newDeptName}")`, (err, rows) => {
                showDepts()
            })
            
        })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the new role?',
            name: 'newRoleTitle'
        }, {
            type: 'input',
            message: 'What is the salary of the new role?',
            name: 'newRoleSalary'
        }, {
            type: 'input',
            message: 'What is the department ID of the new role?',
            name: 'newRoleDeptId'
        }
    ])
        .then((response) => {
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${response.newRoleTitle}", "${response.newRoleSalary}", "${response.newRoleDeptId}")`)
            showRoles()
        })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'newFirstName'
        }, {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'newLastName'
        }, {
            type: 'input',
            message: 'What is the employees manager ID?',
            name: 'newManagerId'
        }, {
            type: 'input',
            message: 'What is the employees Role ID?',
            name: 'newEmpRoleId'
        }
    ])
        .then((response) => {
            db.query(`INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ("${response.newFirstName}", "${response.newLastName}", "${response.newManagerId}", "${response.newEmpRoleId}")`)
            showEmployees()
        })
};

const updateRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the employees ID',
            name: 'updateId'
        }, {
            type: 'input',
            message: 'What is the employees new role ID?',
            name: 'updatedRoleId'
        }

    ])
        .then((response) => {
            db.query(`UPDATE employees SET role_id = "${response.updatedRoleId}" WHERE id = "${response.updateId}"`)
            showEmployees()
        })
};



askUser();