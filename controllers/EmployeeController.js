const Employee = require('../models/Employee');
const db = require('../models/db');


module.exports = {
    getEmployees: async function (req, res) {
        var sql = "SELECT emp_id, first_name, last_name, email, `password`, full_time, date_joined, privilege, d.`name`, d.`description`, l.`name`, address, city, state, country, title, p.`description` FROM employees e JOIN departments d ON e.dep_id = d.dep_id JOIN locations l ON e.location_id = l.location_id JOIN positions p ON e.position_id = p.position_id"
        db.query(sql, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    getEmployee: async function (req, res) {
        var sql = "SELECT emp_id, first_name, last_name, email, `password`, full_time, date_joined, privilege, d.`name`, d.`description`, l.`name`, address, city, state, country, title, p.`description` FROM employees e JOIN departments d ON e.dep_id = d.dep_id JOIN locations l ON e.location_id = l.location_id JOIN positions p ON e.position_id = p.position_id WHERE emp_id = ?"
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
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            department: req.body.department,
            location: req.body.location,
            full_time: req.body.full_time,
            date_joined: req.body.date_joined || new Date(),
            position: req.body.position,
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
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            department: req.body.department,
            location: req.body.location,
            full_time: req.body.full_time,
            position: req.body.position,
            privilege: req.body.privilege
        });

        console.log(employee, req.body)

        db.query(
            "UPDATE employees SET first_name = ?, last_name = ?, email = ?, password = ?, full_time = ?, privilege = ?, dep_id = ?, location_id = ?, position_id = ? WHERE emp_id = ?",
            [employee.first_name, employee.last_name, employee.email, employee.password, employee.full_time, employee.privilege, employee.dep_id, employee.location_id, employee.position_id, req.params.id],
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
                res.send({message: "Employee deleted"});
            }
        });
    }
};