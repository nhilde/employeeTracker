const mysql = require('mysql2');
const inquire = require('inquirer');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yellowdog34',
  database: 'company_db'
});