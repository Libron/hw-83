const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');

const Album = require('../models/Album');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', (req, res) => {
    let searchParams = null;

    if (req.query.artist_id) {
        searchParams = {artist: req.query.artist_id};
    }

    Album.find(searchParams)
        .then(albums => res.send(albums))
        .catch(() => res.sendStatus(500));
});

router.get('/:id', (req, res) => {
    Album.findById(req.params.id).populate('artist')
        .then(album => {
            if (album) res.send(album);
            else res.sendStatus(404);
        })
        .catch(() => res.sendStatus(500));
});

router.post('/', upload.single('image'), (req, res) => {
    const albumData = req.body;

    if (req.file) {
        albumData.image = req.file.filename;
    }

    const album = new Album(albumData);

    album.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
});

module.exports = router;