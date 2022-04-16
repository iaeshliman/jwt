const mysql2 = require('mysql2')

module.exports = mysql2.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 25,
	waitForConnections: true
})
