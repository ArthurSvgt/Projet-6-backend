const express = require('express');
const router = express.Router();

const Sauce = require('../models/sauce');

router.get('/api/sauces', (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
});

router.get('/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
});

router.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
    console.log(req.body)
    const sauce = new Sauce({
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.body.imageUrl}`
    })

    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce ajoutée'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;