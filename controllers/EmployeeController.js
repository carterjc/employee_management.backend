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
    }
};