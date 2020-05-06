const Location = require('../models/Location');
const db = require('../models/db');


module.exports = {
    getLocations: async function (req, res) {
        var sql = "SELECT * FROM locations"
        db.query(sql, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    getLocation: async function (req, res) {
        var sql = "SELECT * FROM locations WHERE location_id = ?"
        db.query(sql, req.params.id, function(err, rows, fields) {
            if (err) {
                res.status.send({ error: err });
            };
            res.json(rows);
        });
    },
    createLocation: async function (req, res) {
        
        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const location = new Location({
            location_id: req.body.location_id,
            loc_name: req.body.loc_name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
        });

        db.query("INSERT INTO locations SET ?", location, (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send(location);

            }
        });
    },
    updateLocation: async function (req, res) {

        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
        };

        const location = new Location({
            location_id: req.body.location_id,
            loc_name: req.body.loc_name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
        });

        console.log(location, req.body)

        db.query(
            "UPDATE locations SET loc_name = ?, address = ?, city = ?, state = ?, country = ? WHERE location_id = ?",
            [location.loc_name, location.address, location.city, location.state, location.country, req.params.id],
            (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: err });
                } else {
                    console.log(resp.insertId);
                    res.send(location);    
                }
            }
        )
    },
    deleteLocation: async function (req, res) {
        db.query("DELETE FROM locations WHERE location_id = ?", parseInt(req.params.id), (err, resp) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err });
            } else {
                console.log(resp.insertId);
                res.send({message: "Location deleted"});
            }
        });
    }
};