const express = require('express')
const router = express.Router()
const Joi = require('joi');

const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Horror"},
    {id: 3, name: "Romance"}
]

router.get('/', (req, res) => {
    res.send(genres)
})

router.post('/', (req, res)=> {
    // Validate created genre
    const {error} = validateGenre(req.body) 
    if(error) return res.status(400).send(error.details[0].message);

    // Add created genre
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre)

    // Show added genre
    res.send(genre)
})

router.put('/:id', (req, res) => {
    // Look up the genre
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    //Validate the genre
    const {error} = validateGenre(req.body) 
    if(error) return res.status(400).send(error.details[0].message);

    // Update the genre
    genre.name = req.body.name

    // Show updated genre
    res.send(genre)
})

router.delete('/:id', (req, res) => {
    // Look up the genre
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    // Delete the genre
    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    // Show deleted genre
    res.send(genre)
})

router.get('/:id', (req, res) => {
    // Look up the genre
    const genre = genres.find(c => c.id === parseInt(req.params.id)   )
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    // Show the genre
    res.send(genre)
})

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

module.exports = router;