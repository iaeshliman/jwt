const Express = require('express')
const Router = Express.Router()

const JwtPermit = require('../middleware/JwtPermit')
const controller = require('../controllers')

Router.post('/jwt/generate', JwtPermit(), controller.token.generate)

module.exports = Router
