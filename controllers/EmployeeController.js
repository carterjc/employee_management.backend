const Employee = require('../models/Employee');
const db = require('../models/db');


module.exports = {
    getEmployees: async function (req, res) {
        var sql = "SELECT * FROM employees"
        db.query(sql, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    getEmployee: async function (req, res) {
        var sql = "SELECT emp_id, emp_fn, emp_ln, email, `password`, full_time, date_joined, privilege, d.`dep_name`, d.`dep_description`, l.`loc_name`, address, city, state, country, pos_title, p.`pos_description` FROM employees e JOIN departments d ON e.dep_id = d.dep_id JOIN locations l ON e.location_id = l.location_id JOIN positions p ON e.position_id = p.position_id WHERE emp_id = ?"
        db.query(sql, req.params.id, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    createEmployee: async function (req, res) {
        
        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const employee = new Employee({
            emp_fn: req.body.emp_fn,
            emp_ln: req.body.emp_ln,
            email: req.body.email,
            password: req.body.password,
            dep_id: req.body.dep_id,
            location_id: req.body.location_id,
            full_time: req.body.full_time,
            date_joined: new Date().toISOString().slice(0, 19).replace('T', ' '),
            position_id: req.body.position_id,
            privilege: req.body.privilege
        });

        db.query("INSERT INTO employees SET ?", employee, (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send(employee);

            }
        });
    },
    updateEmployee: async function (req, res) {

        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const employee = new Employee({
            emp_fn: req.body.emp_fn,
            emp_ln: req.body.emp_ln,
            email: req.body.email,
            password: req.body.password,
            dep_id: req.body.dep_id,
            location_id: req.body.location_id,
            full_time: req.body.full_time,
            position_id: req.body.position_id,
            privilege: req.body.privilege
        });

        console.log(employee, req.body)

        db.query(
            "UPDATE employees SET emp_fn = ?, emp_ln = ?, email = ?, password = ?, full_time = ?, privilege = ?, dep_id = ?, location_id = ?, position_id = ? WHERE emp_id = ?",
            [employee.emp_fn, employee.emp_ln, employee.email, employee.password, employee.full_time, employee.privilege, employee.dep_id, employee.location_id, employee.position_id, req.params.id],
            (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: err });
                } else {
                    console.log(resp.insertId);
                    res.send(employee);    
                }
            }
        )
    },
    deleteEmployee: async function (req, res) {
        db.query("DELETE FROM employees WHERE emp_id = ?", parseInt(req.params.id), (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send({ message: "Employee deleted" });
            }
        });
    }
};