const express = require('express');
const router = express.Router();
const DepartmentController = require("../controllers/DepartmentController")

router.get("/", (req, res) => {
    DepartmentController.getDepartments(req, res);
})

router.get("/:id", (req, res) => {
    DepartmentController.getDepartment(req, res);
})

router.post("/", (req, res) => {
    DepartmentController.createDepartment(req, res);
})

router.post("/update/:id", (req, res) => {
    DepartmentController.updateDepartment(req, res);
})

router.delete("/:id", (req, res) => {
    DepartmentController.deleteDeparment(req, res);
})

module.exports = router;