const Express = require('express')
const Router = Express.Router()

const JwtPermit = require('../middleware/JwtPermit')
const controller = require('../controllers')

Router.post('/jwt/generate', JwtPermit(), controller.token.generate)
Router.get('/jwt/restricted', JwtPermit(['write_tokens']), (_, res) =>
	res.send({ ok: true, message: 'This is a restricted section' })
)
Router.get('/jwt/scopes', (req, res) => res.send({ ok: true, scopes: req.jwt.scopes }))

module.exports = Router
