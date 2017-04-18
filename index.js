const http = require('http'),
	express = require('express'),
	app = express(),
	middleware = require('./middleware')(app, express),
	logger = require('./utils/logger'),
	nconf = require('./config'),
	server = http.createServer(app),
	PORT = process.env.PORT || nconf.get('port')

server.listen(PORT, () => logger.info('Server is running on port ' + PORT))