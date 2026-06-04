const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['SUPER_ADMIN', 'ADMIN'],
    default: 'ADMIN'
  }
});

module.exports = mongoose.model(
  'Admin',
  adminSchema
);