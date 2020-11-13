const { ObjectID } = require('mongodb');
var mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  type: Number,
  name: String,
  status: { type: Number, default: 0 },
  desc: String,
  owner: ObjectID,
  active: { type: Boolean, default: true },
  ownerName: String
}, { timestamps: true });

const Equipment = mongoose.model('Equipment', equipmentSchema, 'equipments');

module.exports = Equipment;