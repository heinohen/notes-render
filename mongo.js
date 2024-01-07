const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://mongohenkka:${password}@isoklusteri.ms3ihqf.mongodb.net/testNoteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note1 = new Note({
  content: 'CSS is hard',
  important: true,
})

const note2 = new Note({
  content: 'React is easy',
  important: true,
})

// eslint-disable-next-line no-unused-vars
note1.save().then(result => {
  console.log('note saved!')
})
// eslint-disable-next-line no-unused-vars
note2.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})