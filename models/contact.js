require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGO_URL

mongoose.set('strictQuery',false)

mongoose.connect(url)
	.then(() => {
		console.log('Connected to DB.')
	})
	.catch(error => {
		console.log('Error connectin to DB', error.message)
	})

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		validate: {
			validator: function(v) {
				return /^\d{2,3}-\d+$/.test(v)
			}
		}
	}
})

contactSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.__v
		delete returnedObject._id
	}
})

module.exports = mongoose.model('Contact', contactSchema)
