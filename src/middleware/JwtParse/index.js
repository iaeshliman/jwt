const uuid = require('uuid')

module.exports = (options = {}) => {
	const config = {
		parse: [
			(req) => {
				if (!req.get('Authorization')) return null
				if (!req.get('Authorization').startsWith('Bearer ')) return null
				return req.get('Authorization')?.replace('Bearer ', '')
			},
			(req) => req.query?.token || null
		]
	}
	if (options.parse) config.parse = Array.isArray(options.parse) ? options.parse : [options.parse]
	return (req, _, next) => {
		try {
			req.jwt = {
				id: uuid.v1(),
				token: config.parse.map((e) => e(req)).filter((e) => e)[0] || null,
				scopes: []
			}
			next()
		} catch (error) {
			return next(error)
		}
	}
}
