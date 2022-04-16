/**
 * Dependencies
 */

// External
const Express = require('express')
const Morgan = require('morgan')

// Internal
const JwtParse = require('./middleware/JwtParse')
const JwtVerify = require('./middleware/JwtVerify')
const JwtPermit = require('./middleware/JwtPermit')
const config = require('./config')
const { NotFoundError } = require('./errors')
const { log } = require('./utils')

/**
 * Application
 */

// Create
const app = Express()

// Configure
app.set('port', config.app.port)
app.set('name', config.app.name)
app.set('env', config.env)

/**
 * Middleware
 */

// Parsing
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

// Jwt
app.use(JwtParse())
app.use(JwtVerify(config.jwt.secret, config.jwt.verify))

// Logging
app.use(
	Morgan((tokens, req, res) =>
		[
			new Date().toISOString(),
			'-',
			'HTTP',
			'-',
			`${req.jwt?.id}`,
			'-',
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			`${tokens['response-time'](req, res)}ms`
		].join(' ')
	)
)

/**
 * Routing
 */

// General
app.get('/', (_, res) => res.send('server is running'))
app.get('/health', (_, res) => res.send({ ok: true, message: 'healthy' }))

// Temp
app.get('/jwt/permissions', (req, res) => res.send({ ok: true, message: req.jwt }))
app.post('/jwt/generate', (req, res) =>
	res.send({ ok: true, message: require('jsonwebtoken').sign(req.body, config.jwt.secret, config.jwt.sign) })
)
app.get('/jwt/restricted', JwtPermit(['read_tokens', 'write_tokens']), (_, res) =>
	res.send({ ok: true, message: 'Restricted access' })
)

/**
 * Error and 404
 */
app.use((_, res, next) => {
	if (res.headersSent) return
	return next(new NotFoundError())
})
app.use((error, req, res, _) => {
	if (res.headersSent) return
	log(
		config.debug.displayStacktrace ? error.stack : `${error.name}: ${error.message}`,
		req.jwt?.id,
		error.code < 500 ? 'WARN' : 'ERROR'
	)
	return res.status(error.code || 500).send({ ok: false, error: error.name, message: error.message })
})

module.exports = app
