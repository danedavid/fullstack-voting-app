const mongoose = require('mongoose');

module.exports = mongoose.model('techs', new mongoose.Schema({
  id: String,
  name: String,
  votes: Number
}, { collection: 'techs' }));
