const sql = require('../models/db');

const Employee = function(employee) {
    this.emp_id = employee.emp_id,
    this.emp_fn = employee.emp_fn,
    this.emp_ln = employee.emp_ln,
    this.email = employee.email,
    this.password = employee.password,
    this.dep_id = employee.dep_id,
    this.location_id = employee.location_id,
    this.full_time = employee.full_time,
    this.date_joined = employee.date_joined,
    this.position_id = employee.position_id,
    this.privilege = employee.privilege
};

module.exports = Employee;