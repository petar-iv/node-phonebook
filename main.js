const createClient = require('./create-client')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('static-resources'))
app.use(bodyParser.json())

app.get('/rest/records/', function(req, res) {
	createClient(function (err, client) {
		if (err) {
			return res.status(500).send('Could not obtain db connection: ' + err.message)
		}

		client.query('SELECT * FROM records ORDER BY id', (err, result) => {
			if (err) {
				return res.status(500).send('Error when trying to retrieve all: ' + err.message)
			}

			res.header('content-type', 'application/json')
			res.send(result.rows.map((row) => {
				row.firstName = row.first_name
				delete row.first_name
				row.lastName = row.last_name
				delete row.last_name
				return row
			}))
		})
	})
})

app.post('/rest/records/', function(req, res) {
	createClient(function (err, client) {
		if (err) {
			return res.status(500).send('Could not obtain db connection: ' + err.message)
		}
		
		let data = req.body
		client.query('INSERT INTO records(first_name, last_name, number) VALUES($1, $2, $3)', [data.firstName, data.lastName, data.number], function(err) {
			if (err) {
				return res.status(500).send('Could not insert data into db: ' + err.message)
			}
			
			res.status(201).send('')
		})
	})
})

app.put('/rest/records/:id', function(req, res) {
	const id = req.params.id
	createClient(function (err, client) {
		if (err) {
			return res.status(500).send('Could not obtain db connection: ' + err.message)
		}
	
		let data = req.body
		client.query('UPDATE records SET first_name=$2, last_name=$3, number=$4 WHERE id=$1', [id, data.firstName, data.lastName, data.number], function(err) {
			if (err) {
				return res.status(500).send('Could not update data in db: ' + err.message)
			}
			
			res.status(200).send('')
		})
	})
})

app.delete('/rest/records/:id', function(req, res) {
	const id = req.params.id
	createClient(function (err, client) {
		if (err) {
			return res.status(500).send('Could not obtain db connection: ' + err.message)
		}
	
		client.query('DELETE FROM records WHERE id=$1', [id], function(err) {
			if (err) {
				return res.status(500).send('Could not delete entry in db: ' + err.message)
			}
			
			res.status(200).send('')
		})
	})
})

app.listen(3000)
