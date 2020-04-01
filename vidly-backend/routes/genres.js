const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const {Genre, validate} = require('../models/genre')
const express = require('express')
const router = express.Router()

router.get('/', auth, async (req, res) => {
    // Find the genres
    const genres = await Genre.find().sort('name')

    // Show genres
    res.send(genres)
})

router.post('/', auth, async (req, res)=> {
    // Validate created genre
    const {error} = validate(req.body) 
    if(error) return res.status(400).send(error.details[0].message);

    // Add created genre
    const genre = new Genre({ name: req.body.name })
    await genre.save()

    // Show added genre
    res.send(genre)
})

router.put('/:id', auth, async (req, res) => {
    //Validate the genre
    const {error} = validate(req.body) 
    if(error) return res.status(400).send(error.details[0].message);

    // Update the genre
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        $set : {
            name: req.body.name
        }
    }, {new: true})

    // Look up the genre
    if(!genre) return res.status(404).send('The Genre with the given ID was not found.');

    // Show updated genre
    res.send(genre)
})

router.delete('/:id', [auth, admin], async (req, res) => {
    // Delete the genre
    const genre = await Genre.findByIdAndRemove(req.params.id)

    // Look up the genre
    if(!genre) return res.status(404).send('The Genre with the given ID was not found.');

    // Show deleted genre
    res.send(genre)
})

router.get('/:id', auth, async (req, res) => {
    // Find the genre
    const genre = await Genre.findById(req.params.id)

    // Look up the genre
    if(!genre) return res.status(404).send('The Genre with the given ID was not found.');

    // Show the genre
    res.send(genre)
})

module.exports = router;