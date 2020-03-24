const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'emp_management'
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connection with database successful")
})

module.exports = connection;