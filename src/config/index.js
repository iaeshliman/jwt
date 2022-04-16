const connection = require('./mysql.config')

const configs = {
	development: {
		env: 'development',
		app: {
			name: process.env.APPLICATION_NAME || 'Jwt Server',
			port: process.env.APPLICATION_PORT || 3000
		},
		debug: {
			displayStacktrace: process.env.DEBUG_DISPLAY_STACKTRACE || true,
			logLevel: process.env.DEBUG_LOG_LEVEL || 'DEBUG'
		},
		connection: connection,
		jwt: {
			secret: process.env.JWT_SECRET || require('crypto').randomBytes(128).toString('hex'),
			verify: {
				issuer: process.env.JWT_ISSUER?.split(','),
				audience: process.env.JWT_AUDIENCE?.split(',')
			},
			sign: {
				issuer: process.env.JWT_ISSUER,
				audience: process.env.JWT_AUDIENCE,
				expiresIn: '15m'
			}
		}
	}
}

module.exports = configs[process.env.NODE_ENV || 'development']
