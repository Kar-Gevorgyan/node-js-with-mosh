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

async function crateCourse(){
    const course = new Course({
        name: "MERN Stack course",
        author: 'Max',
        tags: ['react', 'frontend', 'node', 'mongodb'],
        isPublished: true,
        price: 13
    })
    
    const result = await course.save()
    console.log(result)
}

async function getCourses(){
    // Comparison Query
    // eq (=)
    // ne(!=)
    // gt(>)
    // gte(>=)
    // lt(<)
    // lte(<=)
    // in
    // nin(not in)

    // Logical Query
    //or
    // and

    // for Pagination
    const pageNumber = 2
    const pageSize = 10

    const courses = await Course
        // .find({author: 'Mosh', isPublished: true})
        // .find({price: { $gt : 10, $lt: 20 }}) // >10 & <20
        // .find({ price: { $in: [10, 20, 50] } }) // =10 or =20 or =50
        // .find()
        // .or([ { author:'Mosh' }, { isPublished: true} ])
 
        // -----RegExp------
        // // Start with Mosh
        // .find({ author: /^Mosh/})
        // // Ends with Mosh
        // .find({ author: /Mosh$/})
        // // Contains Mosh
        // .find({ author: /.*Mosh.*/})

        .find({author: 'Mosh', isPublished: true})
        // .skip((pageNumber-1) * pageSize) // for Pagination
        .limit(pageSize)
        .sort({name : -1})
        .select({name: 1, tags: 1, author: 1})
        // .count() // count of documents
    
    console.log(courses)
}

async function updateCourse(id){
    //   Query first
    // const course = await Course.findById(id)
    // console.log(id, course)
    // if(!course) return;

    // course.isPublished = false
    // course.author = 'Another Author'

    // const result = await course.save()
    // console.log(result)

    //   Update first
    // const result = await Course.update({_id: id}, {
    //     $set : {
    //         author: 'Mosh',
    //         isPublished: true
    //     }
    // })
    // console.log(result)

    const result = await Course.findByIdAndUpdate(id, {
        $set : {
            author: 'Mosh',
            isPublished: true
        }
    }, {new: true})
    console.log(result)
}

async function removeCourse(id) {
    // const result = await Course.deleteOne({_id: id})
    // const result = await Course.deleteMany({ isPublished: false})
    // const course = await Course.findByIdAndRemove(id)
    const course = await Course.findByIdAndDelete(id)
    console.log(course)
}

// crateCourse()
// getCourses()
// updateCourse('5e7ce7dee29c68c2ddce69d1')
removeCourse('5e7ce7dee29c68c2ddce69d2')