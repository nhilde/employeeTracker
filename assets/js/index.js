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
                    showDepartments();
                    break;
                case "View all roles":
                    showRoles();
                    break;
            }
        }
        )

}

const showResults = (answer) => {
    if (answer.mainOptions == "View all departments") {
        db.query('SELECT * FROM departments', function (err, response) {
            console.log(response)
        })
    }
}



askUser();