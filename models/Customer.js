const sql = require('../models/db');

const Customer = function(customer) {
    this.customer_id = customer.customer_id,
    this.customer_fn = customer.customer_fn,
    this.customer_ln = customer.customer_ln,
    this.address = customer.address,
    this.city = customer.city,
    this.state = customer.state,
    this.country = customer.country,
    this.company_name = customer.company_name
};

module.exports = Customer;