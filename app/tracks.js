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
        Album.find({artist: req.query.artist_id})
            .then(albums => {
                const trackList = [];
                Promise.all(albums.map(album => {
                    return Track.find({album: album._id}).populate('album').sort({number: 'asc'})
                        .then(tracks => trackList.push(...tracks));
                }))
                    .then(() => res.send(trackList))
                    .catch(e => res.status(500).send(e))
            })
            .catch(() => res.sendStatus(500));
    } else {
        Track.find(searchParams).populate('album').sort({number: 'asc'})
            .then(tracks => res.send(tracks))
            .catch(() => res.sendStatus(500));
    }
});

module.exports = router;