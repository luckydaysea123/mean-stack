
var equipmentService = require('../services/equipment.service')
const userService = require('../services/user.service')

module.exports.getAll = async (request, response) => {
    equipmentService.getAll()
        .then(equipments => {
            // response.status(200).json(equipments);
            promises = [];
            for (const equipment of equipments) {
                promises.push(userService.getByID(equipment.owner))
            }
            Promise.all(promises)
                .then((users) => {
                    users.forEach((user, index) => {
                        if (user) {
                            equipments[index].ownerName = user.username;
                        }
                    });
                    response.status(200).json(equipments);
                })
        })
        .catch(err => {
            response.status(500).json({ message: 'Internal server error' });
        })
}

module.exports.create = (request, response) => {
    equipmentService.create(request.equipment)
        .then(res => {
            response.status(201).json({ message: 'create equipment successfully' });
        })
        .catch(err => {
            response.status(500).json({ message: 'Internal server error' });
        })
}

module.exports.get = (request, response) => {
    equipmentService.getByID(request.params.id)
        .then(res => {
            response.status(200).json(res);
        })
        .catch(err => {
            response.status(500).json({ message: 'Internal server error' });
        })
}

module.exports.getByOwner = (request, response) => {
    equipmentService.getByOwner(request.params.id)
        .then(res => {
            response.status(200).json(res);
        })
        .catch(err => {
            response.status(500).json({ message: 'Internal server error' });
        })
}

module.exports.update = (request, response) => {
    equipmentService.update(request.params.id, request.equipment)
        .then(res => {
            response.status(200).json({ message: 'update equipment successfully' });
        })
        .catch(err => {
            response.status(500).json({ message: 'Internal server error' });
        })
}

module.exports.delete = (request, response) => {
    equipmentService.delete(request.params.id)
        .then(res => {
            response.status(200).json({ message: 'delete equipment successfully' });
        })
        .catch(err => {
            response.status(500).json({ message: 'Internal server error' });
        })
}
