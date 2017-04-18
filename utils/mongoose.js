const mongoose = require('mongoose'),
	config = require('../config'),
	logger = require('./logger'),
	db = mongoose.connection;

	mongoose.Promise = Promise;

mongoose.connect(config.get('db:connection') + '/' + config.get('db:name'));

db.on('error', err => {
	logger.error(err);
});

db.once('open', () => {
	logger.info('Connected to database');
});

db.once('close', () => {
	logger.info('Connection has closed');
});

module.exports = mongoose;