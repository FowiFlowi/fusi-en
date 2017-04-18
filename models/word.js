const mongoose = require('../utils/mongoose'),
	Schema = mongoose.Schema,

	Word = new Schema({
		word: String,
		translate: String,
		author: String,
		date: Date
	});

module.exports = mongoose.model('Word', Word);