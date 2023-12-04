const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const password = "VitsinVimpulaSalasana1"
const nameOfDB = "noteApp"
const url = process.env.MONGODB_URI
//`mongodb+srv://mongohenkka:${password}@isoklusteri.ms3ihqf.mongodb.net/${nameOfDB}?retryWrites=true&w=majority`
console.log('connecting to', url)
// Yhteyden luonti
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
