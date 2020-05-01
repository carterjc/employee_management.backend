const express = require('express');
const router = express.Router();
const CustomerController = require("../controllers/CustomerController")

router.get("/", (req, res) => {
    CustomerController.getCustomers(req, res);
})

router.get("/:id", (req, res) => {
    CustomerController.getCustomer(req, res);
})

router.post("/", (req, res) => {
    CustomerController.createCustomer(req, res);
})

router.post("/update/:id", (req, res) => {
    CustomerController.updateCustomer(req, res);
})

router.delete("/:id", (req, res) => {
    CustomerController.deleteCustomer(req, res);
})

module.exports = router;