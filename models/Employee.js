const sql = require('../models/db');

const Employee = function(employee) {
    this.emp_id = employee.emp_id,
    this.first_name = employee.first_name,
    this.last_name = employee.last_name,
    this.email = employee.email,
    this.password = employee.password,
    this.department = employee.department,
    this.location = employee.location,
    this.full_time = employee.full_time,
    this.date_joined = employee.date_joined,
    this.position = employee.position,
    this.privilege = employee.privilege
};

Employee.create = (newEmployee, res) => {
    sql.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res.insertId);
        }
    });
};

module.exports = Employee;