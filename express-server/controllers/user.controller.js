const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userService = require('../services/user.service')
const config = require('../config')

module.exports.login = async (request, response) => {
    const { username, password } = request.user;
    console.log(password)
    try {
        const user = await userService.getByUserName(username);
        if (!user) {
            return response.status(401).json({ message: 'Incorrect username' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
       
        if (!isValidPassword) {
            return response.status(401).json({ message: 'Incorrect password' });
        }
        console.log('user.password', user.password);
        const token = jwt.sign({ user }, config.jwtKey, { expiresIn: "1h" });
        return response.status(200).json({ token });
    } catch (error) {
        return response.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.register = async (request, response) => {
    const { username, password } = request.user;
    try {
        const user = await userService.getByUserName(username);
        if (user) {
            return response.status(409).json({ message: 'This username is already being used' });
        }
        newPassword = await bcrypt.hash(password, 10)
        await userService.create({ username, password: newPassword });
        return response.status(200).json({ message: 'Register user successfully' });
    } catch (error) {
        return response.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getAll = async (request, response) => {
    userService.getAll()
        .then(res => {
            return response.status(200).json(res);
        })
        .catch(err => {
            return response.status(500).json({ message: 'Internal server error' })
        });
}

module.exports.getByID = (request, response) => {
    userService.getByID(request.params.id)
        .then(res => {
            response.status(200).json(res);
        })
        .catch(err => {
            response.status(500).json({ message: 'Internal server error' });
        })
}

module.exports.update = async (request, response) => {
    if (request.user.password) {
        request.user.password = await bcrypt.hash(request.user.password, 10)
    }
    userService.update(request.params.id, request.user)
        .then(res => {
            response.status(200).json({ message: 'update user successfully' });
        })
        .catch(err => {
            response.status(500).json({ message: 'Internal server error' });
        })
}

module.exports.delete = (request, response) => {
    userService.delete(request.params.id)
        .then(res => {
            response.status(200).json({ message: 'delete user successfully' });
        })
        .catch(err => {
            response.status(500).json({ message: 'Internal server error' });
        })
}
