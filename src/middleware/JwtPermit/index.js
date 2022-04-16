const JwtError = require('./JwtError')

module.exports = (permissions = [], options = {}) => {
	const config = {
		validate: (req, permissions) => permissions.every((permission) => req.jwt.permissions.includes(permission)),
		unauthorized: (req, res, _) => res.send({ ok: false, error: 'Unauthorized', message: req.jwt.errorMessage })
	}
	if (!Array.isArray(permissions)) throw new JwtError('permissions must be an array')
	if (options.validate) config.validate = options.validate
	if (options.unauthorized) config.unauthorized = options.unauthorized
	return (req, res, next) => {
		try {
			if (config.validate(req, permissions)) return next()
			return config.unauthorized(req, res, next)
		} catch (error) {
			return next(error)
		}
	}
}
