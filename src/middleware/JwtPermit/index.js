const JwtError = require('./JwtError')

module.exports = (scopes = [], options = {}) => {
	const config = {
		validate: (req, scopes) => scopes.every((scope) => req.jwt.scopes.includes(scope)),
		unauthorized: (req, res, _) => res.send({ ok: false, error: 'Unauthorized', message: req.jwt.errorMessage })
	}
	if (!Array.isArray(scopes)) throw new JwtError('scopes must be an array')
	if (options.validate) config.validate = options.validate
	if (options.unauthorized) config.unauthorized = options.unauthorized
	return (req, res, next) => {
		try {
			if (config.validate(req, scopes)) return next()
			return config.unauthorized(req, res, next)
		} catch (error) {
			return next(error)
		}
	}
}
