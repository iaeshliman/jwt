const jwt = require('jsonwebtoken')
const JwtError = require('./JwtError')

module.exports = (secret, options = {}) => {
	const config = {
		secret: secret || null,
		options: options.options
	}
	if (!config.secret) throw new JwtError('missing secret')
	return (req, _, next) => {
		try {
			const token = jwt.verify(req.jwt.token, config.secret, config.options)
			if (token.id) req.jwt.id = token.id
			if (token.permissions) req.jwt.permissions = token.permissions
			if (token.exp) req.jwt.exp = token.exp
			next()
		} catch (error) {
			req.jwt.permissions = []
			if (['JsonWebTokenError'].includes(error.name)) return next()
			if (['TokenExpiredError', 'NotBeforeError'].includes(error.name)) {
				req.jwt.errorMessage = error.message
				return next()
			}
			return next(error)
		}
	}
}
