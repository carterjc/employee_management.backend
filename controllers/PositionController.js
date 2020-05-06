const Position = require('../models/Position');
const db = require('../models/db');


module.exports = {
    getPositions: async function (req, res) {
        var sql = "SELECT * FROM positions"
        db.query(sql, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    getPosition: async function (req, res) {
        var sql = "SELECT * FROM positions WHERE position_id = ?"
        db.query(sql, req.params.id, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    createPosition: async function (req, res) {
        
        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const position = new Position({
            position_id: req.body.position_id,
            pos_title: req.body.pos_title,
            pos_description: req.body.pos_description
        });

        db.query("INSERT INTO positions SET ?", position, (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send(position);

            }
        });
    },
    updatePosition: async function (req, res) {

        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const position = new Position({
            position_id: req.body.position_id,
            pos_title: req.body.pos_title,
            pos_description: req.body.pos_description
        });

        console.log(position, req.body)

        db.query(
            "UPDATE positions SET pos_title = ?, pos_description = ? WHERE position_id = ?",
            [position.pos_title, position.pos_description, req.params.id],
            (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: err });
                } else {
                    console.log(resp.insertId);
                    res.send(position);    
                }
            }
        )
    },
    deletePosition: async function (req, res) {
        db.query("DELETE FROM positions WHERE position_id = ?", parseInt(req.params.id), (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send({message: "Position deleted"});
            }
        });
    }
};