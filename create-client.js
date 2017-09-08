const Client = require('pg').Client

module.exports = function(cb) {
	const client = new Client({
		host : process.env.DB_HOST,
		port : process.env.DB_PORT,
		user : process.env.DB_USER,
		password : process.env.DB_PASSWORD,
		database : 'phonebook',
	})
	client.connect(function(err) {
		if (err) {
			return cb(err)
		}
		cb(null, client)
	})
}
