const sql = require('../models/db');

const Department = function(department) {
    this.dep_id = department.dep_id,
    this.dep_name = department.dep_name,
    this.dep_description = department.dep_description
};

module.exports = Department;