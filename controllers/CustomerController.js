const Employee = require('../models/Employee');
const db = require('../models/db');


module.exports = {
    getCustomers: async function (req, res) {
        var sql = "SELECT * FROM customers"
        db.query(sql, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    getCustomer: async function (req, res) {
        var sql = "SELECT * FROM customers WHERE emp_id = ?"
        db.query(sql, req.params.id, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    createCustomer: async function (req, res) {
        
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
                res.send(customer);

            }
        });
    },
    updateCustomer: async function (req, res) {

        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const customer = new customer({
            customer_id: req.body.customer_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            company_name: req.body.company_name
        });

        console.log(customer, req.body)

        db.query(
            "UPDATE customers SET first_name = ?, last_name = ?, address = ?, city = ?, state = ?, country = ?, company_name = ? WHERE customer_id = ?",
            [customer.first_name, customer.last_name, customer.address, customer.city, customer.state, customer.country, customer.company_name, req.params.id],
            (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: err });
                } else {
                    console.log(resp.insertId);
                    res.send(customer);    
                }
            }
        )
    },
    deleteCustomer: async function (req, res) {
        db.query("DELETE FROM customers WHERE customer_id = ?", parseInt(req.params.id), (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send({message: "Customer deleted"});
            }
        });
    }
};