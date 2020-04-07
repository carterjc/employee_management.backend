const express = require('express');
const router = express.Router();
const EmployeeController = require("../controllers/EmployeeController")

router.get("/", (req, res) => {
    EmployeeController.getEmployees(req, res);
})

router.post("/", (req, res) => {
    EmployeeController.createEmployee(req, res);
})

router.post("/update/:id", (req, res) => {
    EmployeeController.updateEmployee(req, res);
})

router.delete("/:id", (req, res) => {
    EmployeeController.deleteEmployee(req, res);
})

module.exports = router;