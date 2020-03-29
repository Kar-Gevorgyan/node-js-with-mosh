const {Genre, validate} = require('../models/genre')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    // Find the genres
    const genres = await Genre.find().sort('name')

    // Show genres
    res.send(genres)
})

router.post('/', async (req, res)=> {
    // Validate created genre
    const {error} = validate(req.body) 
    if(error) return res.status(400).send(error.details[0].message);

    // Add created genre
    const genre = new Genre({ name: req.body.name })
    await genre.save()

    // Show added genre
    res.send(genre)
})

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    // Delete the genre
    const genre = await Genre.findByIdAndRemove(req.params.id)

    // Look up the genre
    if(!genre) return res.status(404).send('The Genre with the given ID was not found.');

    // Show deleted genre
    res.send(genre)
})

router.get('/:id', async (req, res) => {
    // Find the genre
    const genre = await Genre.findById(req.params.id)

    // Look up the genre
    if(!genre) return res.status(404).send('The Genre with the given ID was not found.');

    // Show the genre
    res.send(genre)
})

module.exports = router;