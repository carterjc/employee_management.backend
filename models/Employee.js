const sql = require('../models/db');

const Employee = function(employee) {
    this.emp_id = employee.emp_id,
    this.first_name = employee.first_name,
    this.last_name = employee.last_name,
    this.email = employee.email,
    this.password = employee.password,
    this.dep_id = employee.department,
    this.location_id = employee.location,
    this.full_time = employee.full_time,
    this.date_joined = employee.date_joined,
    this.position_id = employee.position,
    this.privilege = employee.privilege
};

module.exports = Employee;