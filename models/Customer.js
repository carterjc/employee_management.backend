const sql = require('../models/db');

const Customer = function(customer) {
    this.customer_id = customer.customer_id,
    this.first_name = customer.first_name,
    this.last_name = customer.last_name,
    this.address = customer.address,
    this.city = customer.city,
    this.state = customer.state,
    this.country = customer.country,
    this.company_name = customer.company_name
};

module.exports = Customer;