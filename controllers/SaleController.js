const Sale = require('../models/Sale');
const db = require('../models/db');


module.exports = {
    getSales: async function (req, res) {
        var sql = "SELECT * FROM sales"
        db.query(sql, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    getSale: async function (req, res) {
        var sql = "SELECT sale_id, amount, installments, init_date, date_due, emp_fn, emp_ln, email, `password`, full_time, date_joined, privilege, customer_fn, customer_ln, c.address, c.city, c.state, c.country, c.company_name FROM sales s JOIN employees e ON e.emp_id = s.emp_id JOIN customers c ON c.customer_id = s.customer_id WHERE sale_id = ?"
        db.query(sql, req.params.id, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    createSale: async function (req, res) {
        
        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const sale = new Sale({
            amount: req.body.amount,
            installments: req.body.installments,
            init_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            date_due: req.body.date_due,
            emp_id: req.body.emp_id,
            customer_id: req.body.customer_id
        });

        db.query("INSERT INTO sales SET ?", sale, (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send(sale);

            }
        });
    },
    updateSale: async function (req, res) {

        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const sale = new Sale({
            amount: req.body.amount,
            installments: req.body.installments,
            init_date: req.body.init_date.slice(0, 19).replace('T', ' '),
            date_due: req.body.date_due.slice(0, 19).replace('T', ' '),
            emp_id: req.body.emp_id,
            customer_id: req.body.customer_id
        });

        console.log(sale, req.body)

        db.query(
            "UPDATE sales SET amount = ?, installments = ?, init_date = ?, date_due = ?, emp_id = ?, customer_id = ? WHERE sale_id = ?",
            [sale.amount, sale.installments, sale.init_date, sale.date_due, sale.emp_id, sale.customer_id, req.params.id],
            (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: err });
                } else {
                    console.log(resp.insertId);
                    res.send(sale);    
                }
            }
        )
    },
    deleteSale: async function (req, res) {
        db.query("DELETE FROM sales WHERE sale_id = ?", parseInt(req.params.id), (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send({message: "Sale deleted"});
            }
        });
    }
};