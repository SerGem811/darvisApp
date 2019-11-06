const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CameraSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: true,
    minlength: 3,
    maxlength: 15
  },
  type: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  isActive: {
    type: Boolean,
    default: false
  },
  ip: {
    type: String,
    required: true
  },
  username: {
    type: String,
    default: '',
    required: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  created: { type: Date, default: Date.now }
});

const Camera = mongoose.model('Camera', CameraSchema);

module.exports = Camera;
