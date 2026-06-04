const mongoose = require('mongoose');

const messageLogSchema = new mongoose.Schema({
  adminId: String,
  customerIds: [String],
  message: String,
  status: {
    type: String,
    default: 'PENDING'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model(
  'MessageLog',
  messageLogSchema
);