const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    const user = new User(req.body);

    user.generateToken();

    try {
        await user.save();
        return res.send({token: user.token});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Username not found'});
    }
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Password is incorrect'});
    }

    user.generateToken();

    await user.save();
    res.send({token: user.token});
});

module.exports = router;