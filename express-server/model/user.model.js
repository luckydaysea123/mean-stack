var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: Number,
    default: 1
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;