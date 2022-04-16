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
		jwt: {
			secret: process.env.JWT_SECRET || 'my_super_secret_secret',
			verify: {},
			sign: {}
		}
	}
}

module.exports = configs[process.env.NODE_ENV || 'development']
