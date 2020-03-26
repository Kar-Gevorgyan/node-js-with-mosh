const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Course', courseSchema)

//   Solution 1
// async function getCourses(){
//     return await Course
//         .find({ isPublished: true, tags: 'backend'})
//         .sort({ name: 1 }) // .sort('name')
//         .select({ name: 1, author: 1 }) // .select('name author')
// }

//   Solution 2
// async function getCourses(){
//     return await Course
//         //   Method 1
//         // .find({ isPublished: true, tags: { $in: ['frontend', 'backend']}})
//         //   Method 2
//         .find({ isPublished: true})
//         .or([{tags: 'frontend'}, {tags: 'backend'}])
//         .sort('-price')
//         .select('name author price')
// }

//   Solution 3
async function getCourses(){
    return await Course
        .find({ isPublished: true})
        .or([{price: { $gte: 15}}, {name: /.*by.*/i}])
        .sort('-price')
        .select('name price')
}

async function run(){
    const courses = await getCourses()
    console.log(courses)
}

run()
