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

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})