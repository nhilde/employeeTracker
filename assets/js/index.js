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

}

const showDepts = () => {
    db.query('SELECT * FROM departments', function (err, response) {
        console.table(response)
        if(err) console.log(err)
    })
}

const showRoles = () => {
    db.query('SELECT * FROM roles', function (err, response) {
        console.table(response)
        if(err) console.log(err)
    })
}

const showEmployees = () => {
    db.query('SELECT * FROM employees', function (err, response) {
        console.table(response)
        if(err) console.log(err)
    })
}

const addDept = () => {
    inquire.prompt([
{
    type: 'input',
    message: 'What is the new department name?',
    name: 'newDeptName'

}
    ])
    .then((response) => {
        db.query(`INSERT INTO departments (name) VALUES(${response.newDeptName}`)
        showDepts();
    })
}



askUser();