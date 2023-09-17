const User = require('../models/user');

exports.postUser = async (req, res, next) => {
    try {
        if (!req.body.mobile) {
            throw new Error('Mobile No cannot be empty');
        }
        const name = req.body.name;
        const email = req.body.email;
        const mobile = req.body.mobile;

        const newUser = await User.create({
            Name: name,
            Email: email,
            Mobile: mobile
        });

        res.status(201).json({ newUserDetails: newUser });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ allUsers: users })
    } catch (err) {
        console.log('Error at getUser')
        res.status(500).json({ error: err })
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        if (!req.params.userId) {
            console.log('user id not found');
            return res.status(400).json({ err: 'user id not found' });
        }
        const deleteId = req.params.userId;
        // const user = await User.findByPk(deleteId)
        await User.destroy({ where: { id: deleteId } });
        res.sendStatus(200)
    } catch (err) {
        console.log('error at destroy');
        res.status(500).json({ error: err })
    }
}