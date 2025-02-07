const mongoose = require('mongoose')

if (process.argv.length<3) {
	console.log('HOX! Give password as an argument!')
	process.exit(1)
}

const db_pass = process.argv[2]

const url = `mongodb+srv://mikaelh:<db_pass>@mooc.rhadm.mongodb.net/phonebook?retryWrites=true&w=majority&appName=mooc`

mongoose.set('strictQuery',false)

const noteSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Note = mongoose.model('Note', noteSchema)

const name = process.argv[3]
const number = process.argv[4]

const note = new Note({
	name: name,
	number: number
})

note.save().then(result => {
	console.log(`Added ${name}`)
	mongoose.connection.close()
})
