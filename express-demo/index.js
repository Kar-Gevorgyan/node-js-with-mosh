const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(helmet())
app.use(morgan('tiny'))

app.use(logger.log)

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
]

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.post('/api/courses', (req, res)=> {
    // Validate created course
    const {error} = validateCourse(req.body) 
    if(error) return res.status(400).send(error.details[0].message);

    // Add created course
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)

    // Show added course
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given ID was not found');

    //Validate the course
    const {error} = validateCourse(req.body) 
    if(error) return res.status(400).send(error.details[0].message);

    // Update the course
    course.name = req.body.name

    // Show updated course
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given ID was not found');

    // Delete the course
    const index = courses.indexOf(course)
    courses.splice(index, 1)

    // Show deleted course
    res.send(course)
})

app.get('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id)   )
    if(!course) return res.status(404).send('The course with the given ID was not found');

    // Show the course
    res.send(course)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

const port = process.env.PORT || 3000

app.listen(port, ()=>{ console.log(`Listening on port ${port}...`)})