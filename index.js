const http = require('http')
const app = require('./src/app.js')

http.createServer(app).listen(app.get('port'), () =>
	console.log(`${app.get('name')} is listening on port ${app.get('port')}`)
)
