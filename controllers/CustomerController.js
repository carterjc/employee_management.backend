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
        var sql = "SELECT * FROM customers WHERE customer_id = ?"
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

        const customer = new Customer({
            customer_id: req.body.customer_id,
            customer_fn: req.body.customer_fn,
            customer_ln: req.body.customer_ln,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            company_name: req.body.company_name
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

        const customer = new Customer({
            customer_id: req.body.customer_id,
            customer_fn: req.body.customer_fn,
            customer_ln: req.body.customer_ln,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            company_name: req.body.company_name
        });

        console.log(customer, req.body)

        db.query(
            "UPDATE customers SET customer_fn = ?, customer_ln = ?, address = ?, city = ?, state = ?, country = ?, company_name = ? WHERE customer_id = ?",
            [customer.customer_fn, customer.customer_ln, customer.address, customer.city, customer.state, customer.country, customer.company_name, req.params.id],
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