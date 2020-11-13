var User = require('../model/user.model')
var equipmentService = require('../services/equipment.service')
var Equipment = require('../model/equipment.model')

module.exports.create = async (user) => {
    const u = new User(user);
    return await u.save();
}

module.exports.getAll = async () => {
    return await User.find({ active: true, role: 1 }).exec();
}

module.exports.getByID = async (_id) => {
    return await User.findOne({ active: true, _id });
}

module.exports.getByUserName = async (username) => {
    return await User.findOne({ active: true, username });
}

module.exports.update = async (_id, user) => {
    return await User.updateOne({ _id, active: true }, user);
}

module.exports.delete = async (_id) => {
    await Equipment.update({ owner: _id }, { owner: null, status: 0 });
    return await User.update({ _id, active: true }, { active: false });
}