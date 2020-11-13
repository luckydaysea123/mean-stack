var Equipment = require('../model/equipment.model')

module.exports.create = async (equipment) => {
  const e = new Equipment(equipment);
  return await e.save();
}

module.exports.getAll = async () => {
  return await Equipment.find({ active: true }).exec();
}

module.exports.getByID = async (_id) => {
  return await Equipment.findOne({ active: true, _id });
}

module.exports.getByOwner = async (owner) => {
  return await Equipment.find({ active: true, owner});
}

module.exports.update = async (_id, equipment) => {
  equipment.active = true;
  return await Equipment.updateOne({ _id}, equipment);
}

module.exports.delete = async (_id) => {
  return await Equipment.updateOne({ _id, active: true }, { active: false });
}