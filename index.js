const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

morgan.token('data', function (req) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :response-time :data'))
app.use(cors())
app.use(express.static('dist'))

app.get('/api/persons/', (req, res) => {
	Contact.find({}).then((allContacts) => {
		res.json(allContacts)
	})
})

app.get('/info/',(req,res) => {
	const currentTime = new Date()
	Contact.find({})
		.then(allContacts => {
			const responseText = `${allContacts.length} contacts in phonebook ${currentTime}`
			res.json(responseText)
		})

})

app.get('/api/persons/:id', (req, res, next) => {
	const id = req.params.id
	Contact.findById({ _id: id })
		.then(fetchedContact => {
			res.json(fetchedContact)
		})
		.catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) => {
	Contact.find({})
		.then((currentContacts) => {
			if (!req.body.number) {
				return res.status(404).json({ error: 'Name and number must be defined.' })
			}

			if(currentContacts.find(x => x.name === req.body.name) || req.body.name.length === 0 ||req.body.number.length === 0) {
				return res.status(404).json({ error: 'Name and number must be unique and the length can not be 0.' })
			}
			var newContact = new Contact({
				"name": req.body.name,
				"number": req.body.number
			})
			newContact.save()
				.then(() => {
					console.log(`Added ${req.body.name} ${req.body.number} into DB.`)
					res.status(200).json(req.body)
				})
				.catch(error => next(error))
		})
})

app.delete('/api/persons/:id', (req, res, next) => {
	Contact.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body

	const contact = {
		name: body.name,
		number: body.number
	}

	Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
		.then(updatedNote => {
			res.json(updatedNote)
		})
		.catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT ||3001
app.listen(PORT, () => {
	console.log(`Server at ${PORT}`)
})
