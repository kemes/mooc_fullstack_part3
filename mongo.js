const mongoose = require('mongoose')

if (process.argv.length<3) {
	console.log('HOX! Give password as an argument!')
	process.exit(1)
}

const db_pass = process.argv[2]

const url = `mongodb+srv://mikaelh:${db_pass}@mooc.rhadm.mongodb.net/phonebook?retryWrites=true&w=majority&appName=mooc`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length===3) {
	console.log('::Phonebook::')
	Contact.find({}).then(result => {
		result.forEach(contact => {
		console.log(`${contact.name}\t${contact.number}`)
		mongoose.connection.close()
		})
	})
} else {
	const name = process.argv[3]
	const number = process.argv[4]

	const contact = new Contact({
		name: name,
		number: number,
	})

	contact.save().then(() => {
		console.log(`Added ${name} ${number} to phonebook`)
		mongoose.connection.close()
	})
}

