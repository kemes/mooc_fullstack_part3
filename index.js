const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('data', function (req, res) { return JSON.stringify(req.body) }) 

app.use(express.json())
app.use(morgan(':method :url :response-time :data'))
app.use(cors())
app.use(express.static('dist'))

let contacts = [
	    { 
			      "id": "1",
			      "name": "Arto Hellas", 
			      "number": "040-123456"
			    },
	    { 
			      "id": "2",
			      "name": "Ada Lovelace", 
			      "number": "39-44-5323523"
			    },
	    { 
			      "id": "3",
			      "name": "Dan Abramov", 
			      "number": "12-43-234345"
			    },
	    { 
			      "id": "4",
			      "name": "Mary Poppendieck", 
			      "number": "39-23-6423122"
			    }
]


app.get('/api/persons/', (req, res) => {
	res.json(contacts)
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
	const newid = Math.floor(Math.random() * 1000000)
	if (!req.body.name || !req.body.number) {
		res.send({error: 'Name and number must be defined.'})
		res.end()
	}
	if(contacts.find(x => x.name === req.body.name) || req.body.name.length == 0 || req.body.number.length == 0) {
		res.send({error: 'Name and number must be unique and the length can not be 0.'})
	} else {
		const newContact = {
			"id": String(newid + 1),
			"name": req.body.name,
			"number": req.body.number
		}
		contacts = contacts.concat(newContact)
		console.log(contacts)
		res.send()
	}

})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id

	contacts = contacts.filter(x => x.id !== id)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server at ${PORT}`)
})
