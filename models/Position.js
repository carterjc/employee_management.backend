const sql = require('../models/db');

const Position = function(position) {
    this.position_id = position.position_id,
    this.pos_title = position.pos_title,
    this.pos_description = position.pos_description
};

module.exports = Position;