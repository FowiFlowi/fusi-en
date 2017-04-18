const mongoose = require('../utils/mongoose'),
	Schema = mongoose.Schema,

	Fusien = new Schema({
		nextClass: Date,
		flagClass: Boolean
	})

module.exports = mongoose.model('Fusien', Fusien)