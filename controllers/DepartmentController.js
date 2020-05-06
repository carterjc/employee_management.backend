const Department = require('../models/Department');
const db = require('../models/db');


module.exports = {
    getDepartments: async function (req, res) {
        var sql = "SELECT * FROM departments"
        db.query(sql, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    getDepartment: async function (req, res) {
        var sql = "SELECT * FROM departments WHERE dep_id = ?"
        db.query(sql, req.params.id, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    createDepartment: async function (req, res) {
        
        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const department = new Department({
            dep_id: req.body.dep_id,
            dep_name: req.body.dep_name,
            dep_description: req.body.dep_description
        });

        db.query("INSERT INTO departments SET ?", department, (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send(department);

            }
        });
    },
    updateDepartment: async function (req, res) {

        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const department = new Department({
            dep_id: req.body.dep_id,
            dep_name: req.body.dep_name,
            dep_description: req.body.dep_description
        });

        console.log(department, req.body)

        db.query(
            "UPDATE departments SET dep_name = ?, dep_description = ? WHERE dep_id = ?",
            [department.dep_name, department.dep_description, req.params.id],
            (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: err });
                } else {
                    console.log(resp.insertId);
                    res.send(department);    
                }
            }
        )
    },
    deleteDeparment: async function (req, res) {
        db.query("DELETE FROM departments WHERE dep_id = ?", parseInt(req.params.id), (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send({message: "Department deleted"});
            }
        });
    }
};