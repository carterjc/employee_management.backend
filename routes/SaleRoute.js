const express = require('express');
const router = express.Router();
const SaleController = require("../controllers/SaleController")

router.get("/", (req, res) => {
    SaleController.getSales(req, res);
})

router.post("/", (req, res) => {
    SaleController.createSale(req, res);
})

router.post("/update/:id", (req, res) => {
    SaleController.updateSale(req, res);
})

router.delete("/:id", (req, res) => {
    SaleController.deleteSale(req, res);
})

module.exports = router;