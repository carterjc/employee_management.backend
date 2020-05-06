const express = require('express');
const router = express.Router();
const PositionController = require("../controllers/PositionController")

router.get("/", (req, res) => {
    PositionController.getPositions(req, res);
})

router.get("/:id", (req, res) => {
    PositionController.getPosition(req, res);
})

router.post("/", (req, res) => {
    PositionController.createPosition(req, res);
})

router.post("/update/:id", (req, res) => {
    PositionController.updatePosition(req, res);
})

router.delete("/:id", (req, res) => {
    PositionController.deletePosition(req, res);
})

module.exports = router;