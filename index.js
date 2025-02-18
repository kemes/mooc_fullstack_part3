const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

morgan.token('data', function (req, res) { return JSON.stringify(req.body) }) 

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
	const responseText = `<p>${Object.keys(contacts).length} contacts in phonebook</p><br /><p>${currentTime}</p>`

	res.send(responseText)
})

app.get('/api/persons/:id', (req,res) => {
	const id = req.params.id
	const note = contacts.find(x => x.id === id)

	if (!note) {
		return res.status(400).json({
			error:'Wrong ID'
		})
	} else {
		res.send(note)
	}

})

app.post('/api/persons/', (req, res) => {
	Contact.find({}).then((currentContacts) => {
		if (!req.body.name || !req.body.number) {
			return res.status(404).json({error: 'Name and number must be defined.'})
		}

		if(currentContacts.find(x => x.name === req.body.name) || req.body.name.length === 0 || req.body.number.length === 0) {
			return res.status(404).json({error: 'Name and number must be unique and the length can not be 0.'})
		}
		var newContact = new Contact({
			"name": req.body.name,
			"number": req.body.number
		})
		newContact.save().then(res => {
			console.log(`Added ${req.body.name} ${req.body.number} into DB.`)
		})
		res.status(200).json(req.body)
	})
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id

	contacts = contacts.filter(x => x.id !== id)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server at ${PORT}`)
})
