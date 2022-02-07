const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/wykresy', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'wykresy.html'));
});

router.get('/dane', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'dane.html'));
});


router.get('/stream', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'stream.html'));
});

router.get('/swiatlo', (req, res, next) => {
res.sendFile(path.join(rootDir, 'views', 'swiatlo.html'));
});

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'szklarnia.html'));
});

module.exports = router;