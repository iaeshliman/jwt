const config = require('../config')

const levels = {
	ERROR: {
		priority: 0,
		log: (message) => console.error('\x1b[31m%s\x1b[0m', message)
	},
	WARN: {
		priority: 1,
		log: (message) => console.warn('\x1b[33m%s\x1b[0m', message)
	},
	INFO: {
		priority: 2,
		log: (message) => console.info('\x1b[37m%s\x1b[0m', message)
	},
	DEBUG: {
		priority: 3,
		log: (message) => console.debug('\x1b[34m%s\x1b[0m', message)
	}
}

const allowLog = (level) =>
	levels[level]?.priority <= levels[config.debug.logLevel].priority

const log = (message, uuid, level = 'INFO') => {
	if (!allowLog(level)) return
	levels[level].log(
		[
			new Date().toISOString(),
			'-',
			level,
			'-',
			`[${uuid}]`,
			'-',
			message
		].join(' ')
	)
}

module.exports = log
