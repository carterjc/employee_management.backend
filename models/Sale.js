const sql = require('../models/db');

const Sale = function(sale) {
    this.sale_id = sale.sale_id,
    this.amount = sale.amount,
    this.installments = sale.installments,
    this.init_date = sale.init_date,
    this.date_due = sale.date_due,
    this.emp_id = sale.emp_id,
    this.customer_id = sale.customer_id
}

module.exports = Sale;
