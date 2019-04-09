const express = require('express');
const Track = require('../models/Track');

const Album = require('../models/Album');   // Дополнительное задание

const router = express.Router();

router.get('/', (req, res) => {
    let searchParams = null;

    if (req.query.album_id) {
        searchParams = {album: req.query.album_id};
    }

    // Дополнительное задание
    if (req.query.artist_id) {
        const trackList = [];
        Album.find({artist: req.query.artist_id})
            .then(albums => {
                albums.map(album => {
                    Track.find({album: album._id})
                        .then(tracks => {
                            trackList.push(...tracks);
                            res.send(trackList);
                        })
                        .catch(() => res.sendStatus(500));
                });
            })
            .catch(() => res.sendStatus(500));
    } else {
        Track.find(searchParams)
            .then(tracks => res.send(tracks))
            .catch(() => res.sendStatus(500));
    }
});

module.exports = router;