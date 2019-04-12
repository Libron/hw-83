const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    const token = req.get("Authorization");

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Unauthorized'});
    }

    const trackData = req.body;
    trackData.datetime = new Date().toLocaleString();
    trackData.user = user._id;

    const trackHistory = new TrackHistory(trackData);

    await trackHistory.save();
    res.status(200).send(trackHistory);
});

module.exports = router;