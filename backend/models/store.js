const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
  deleted: Boolean,
  location: {lat: String, long: String},
  title: {type: String, required: true},
  description: {type: String, required: true}
});

module.exports = mongoose.model('Store', storeSchema);
