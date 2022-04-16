const jwt = require('jsonwebtoken')
const JwtError = require('./JwtError')

module.exports = (secret, options = {}) => {
	const config = {
		secret: secret || null,
		options: options.options,
		verify: (token) => true
	}
	if (!config.secret) throw new JwtError('missing secret')
	if (options.verify) config.verify = options.verify
	return (req, _, next) => {
		try {
			const token = jwt.verify(req.jwt.token, config.secret, config.options)
			if (!config.verify(token)) throw new JwtError('token is invalid')
			if (token.id) req.jwt.id = token.id
			if (token.scopes) req.jwt.scopes = token.scopes
			if (token.exp) req.jwt.exp = token.exp
			next()
		} catch (error) {
			req.jwt.scopes = []
			if (['JsonWebTokenError'].includes(error.name)) return next()
			if (['TokenExpiredError', 'NotBeforeError'].includes(error.name)) {
				req.jwt.errorMessage = error.message
				return next()
			}
			return next(error)
		}
	}
}
