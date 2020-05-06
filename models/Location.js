const sql = require('../models/db');

const Location = function(location) {
    this.location_id = location.location_id,
    this.loc_name = location.loc_name,
    this.address = location.address,
    this.city = location.city,
    this.state = location.state,
    this.country = location.country
};

module.exports = Location;