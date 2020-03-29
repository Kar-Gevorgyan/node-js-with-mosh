const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const authorSchema = new mongoose.Schema({
        name: String,
        bio: String,
        website: String
})

const courseSchema = new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
})

const Author = mongoose.model('Author', authorSchema)
const Course = mongoose.model('Course', courseSchema)

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    })

    const result = await author.save()
    console.log(result)
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    })

    const result = await course.save()
    console.log(result)
}

async function listCourses(){
    const list = await Course
        .find()
        .populate('author', 'name -_id')
        .select('name author')
    console.log(list)
}

// createAuthor('Mosh', 'My bio', 'My website')
// createCourse('Node Course', '5e8069b57fda652fe443571e')
// listCourses()