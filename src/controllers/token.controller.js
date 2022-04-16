const { token } = require('../services')

const generate = async (req, res, next) => {
	try {
		const result = await token.generate(req.body)
		return res.send({ ok: true, token: result })
	} catch (error) {
		return next(error)
	}
}

module.exports = {
	generate
}
