const Winston = require('winston');

let transports = [
		// new Winston.transports.File({
		// 	filename: 'logs/app.log',
		// 	timestamp: () => (new Date).toLocaleTimeString(),
		// 	level: 'info'
		// }),
		new Winston.transports.Console({
			timestamp: () => (new Date).toLocaleTimeString(),
			colorize: true,
			level: 'info'
		})
	];

module.exports = new Winston.Logger({ transports });