const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  url: String,
  type: String,
  size: Number,
  metadata: {
    type: Object,
    default: {},
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);
