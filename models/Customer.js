const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  city: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model(
  'Customer',
  customerSchema
);