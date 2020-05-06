const express = require('express');
const router = express.Router();
const LocationController = require("../controllers/LocationController")

router.get("/", (req, res) => {
    LocationController.getLocations(req, res);
})

router.get("/:id", (req, res) => {
    LocationController.getLocation(req, res);
})

router.post("/", (req, res) => {
    LocationController.createLocation(req, res);
})

router.post("/update/:id", (req, res) => {
    LocationController.updateLocation(req, res);
})

router.delete("/:id", (req, res) => {
    LocationController.deleteLocation(req, res);
})

module.exports = router;