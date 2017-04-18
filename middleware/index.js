const bodyParser = require('body-parser'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	mongoCon = require('../utils/mongoose'),
	router = require('../routes'),
	logger = require('../utils/logger'),
	errorHandler = require('./errorHandler')
	config = require('../config'),

module.exports = function(app, express) {
	app.set('view engine', 'jade')

	app.use((req, res, next) => {
		logger.info(req.method, req.url)
		next()
	})

	app.use(express.static(__dirname + '/../public'))
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	app.use(session({
		secret: config.get('session:secret'),
		store: new MongoStore({
			mongooseConnection: mongoCon.connection
		}),
		resave: true,
		saveUninitialized: true
	}))

	router(app)


	errorHandler(app, logger)
}