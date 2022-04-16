class HttpError extends Error {
	constructor(message, code) {
		super(message)

		this.name = this.constructor.name
		this.code = code

		Error.captureStackTrace(this, this.constructor)
	}
}

class NotFoundError extends HttpError {
	constructor() {
		super('page not found', 404)
	}
}

module.exports = {
	HttpError,
	NotFoundError
}
