const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}))

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: {
        type: [authorSchema],
        required: true
    }
}))

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    })

    const result = await course.save()
    console.log(result)
}

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId)
    course.authors.push(author)
    course.save()
}

async function updateAuthor(courseId, authorId){
    const course = await Course.findById(courseId)
    const author = await course.authors.id(authorId)
    author.name = 'Amy'
    course.save()
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId)
    const author = await course.authors.id(authorId)
    author.remove()
    course.save()
}

async function listCourses(){
    const list = await Course
        .find()
        .populate('author', 'name -_id')
        .select('name author')
    console.log(list)
}

// createCourse('Node Course', [
//     new Author({ name: 'Mosh'}),
//     new Author({ name: 'Jack'})
// ])
// addAuthor('5e8075a8a4cba630b4bbaacb', new Author({ name: 'Samuel'}))
// updateAuthor('5e8075a8a4cba630b4bbaacb', '5e8075a8a4cba630b4bbaaca')
// removeAuthor('5e8075a8a4cba630b4bbaacb', '5e8076ae66788021185d6829')
// listCourses()