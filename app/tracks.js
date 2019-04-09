const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', (req, res) => {
    let searchParams = null;

    if (req.query.album_id) {
        searchParams = {artist: req.query.album_id};
    }
    Track.find(searchParams)
        .then(tracks => res.send(tracks))
        .catch(() => res.sendStatus(500));
});

module.exports = router;