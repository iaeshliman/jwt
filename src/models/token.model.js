const util = require('util')
const { connection } = require('../config')

const insertCallback = (data, cb) => {
	connection.query('INSERT INTO token SET ?', [data], (error, result) => {
		if (error) return cb(error, null)
		return cb(null, result)
	})
}

module.exports = {
	insert: util.promisify(insertCallback)
}
