const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const config = require('../config')
const { token } = require('../models')

const generate = async (body) => {
	const jwtToken = jwt.sign(body, config.jwt.secret, { ...config.jwt.sign, jwtid: uuid.v1(), mutatePayload: true })
	token.insert({ jti: body.jti, id: body.id, exp: body.exp, enabled: true })
	return jwtToken
}

module.exports = {
	generate
}
