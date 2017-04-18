const mongoose = require('../utils/mongoose'),
	Schema = mongoose.Schema,

	Fuser = new Schema({
		username: String,
		wordsAmount: Number
	});

module.exports = mongoose.model('Fuser', Fuser);
