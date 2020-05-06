const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080 || process.env.PORT
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.json());

app.get("/api/v1/", (req, res) => {
    res.json({ message: "Employee management API "});
});

const employeeRouter = require('./routes/EmployeeRoute');
app.use('/api/v1/employees', employeeRouter);

const saleRouter = require('./routes/SaleRoute');
app.use('/api/v1/sales', saleRouter);

const customerRouter = require('./routes/CustomerRoute');
app.use('/api/v1/customers', customerRouter);

const departmentRouter = require('./routes/DepartmentRoute');
app.use('/api/v1/departments', departmentRouter);

const locationRouter = require('./routes/LocationRoute');
app.use('/api/v1/locations', locationRouter);

const positionRouter = require('./routes/PositionRoute');
app.use('/api/v1/positions', positionRouter);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})