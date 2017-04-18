module.exports = function(app, logger) {
	app.use((req, res, next) => {
		throw new Error('not found')
	})

	app.use((err, req, res, next) => {
		if (~err.message.indexOf('not found'))
			res.status(404).send('not found')
		else {
			logger.error(err)
			res.status(500).render('error500')
		}
	})
}