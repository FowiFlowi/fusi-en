const logger = require('../utils/logger'),
	path = require('path'),
	config = require('../config'),
	Fuser = new require('../models/fuser'),
	Fusien = new require('../models/fusien'),
	Word = new require('../models/word'),
	translate = require('google-translate-api')

exports.getRoot = (req, res) => res.status(200).redirect('/home')
exports.getHome = (req, res) => res.render('index')



exports.getWords = (req, res) => Word.find({}).then(list => res.send(list))

exports.postWords = (req, res) => {
	let data = req.body

	if (req.session.user) {
		let word = new Word({
			word: data.word.toLowerCase().trim(),
			translate: data.translate.toLowerCase().trim(),
			author: data.author,
			date: data.date
		})
		word.save((e, element) => {
			e && logger.error(e)
			res.send(element._id)
		})

		Fuser.findOne({ username: data.author })
		.then(user => {
			user.wordsAmount++
			user.save(e => e && logger.error(e))

			req.session.user.wordsAmount++
			req.session.save(e => e && logger.error(e))
		})
		.catch(e => logger.error(e))
	}
	logger.info(`${data.author} has added new word: ${data.word} - ${data.translate}`)
}

exports.deleteWords = (req, res) => {
	if (req.session.user) {
		Word.findById(req.params.id)
			.then(word => {
				if (word.author == req.session.user.username)
					return Word.findByIdAndRemove(req.params.id)
				else {
					logger.info(`${req.session.user.username} tried to delete word that doesn't belong to him`)
					throw new Error('Permission denied')
				}
			})
			.then(r => {
				logger.info(`${r.author} has deleted word: ${r.word} - ${r.translate}`)
				return Fuser.findOne({username: r.author})
			})
			.then(user => {
				user.wordsAmount--
				user.save(e => e && logger.error(e))

				req.session.user.wordsAmount--
				req.session.save(e => e && logger.error(e))
			})
			.catch(e => res.send(e))
	}
}



exports.getWho = (req, res) => {
	Fuser.find({})
	.then(arrayOfUsers => {
		if (req.session.user) {
			Fuser.findOne({ username: req.session.user.username })
			.then(user => res.send([user].concat(arrayOfUsers)))
			.catch(e => res.send(e))
		} else
			res.send([''].concat(arrayOfUsers))
	})
	.catch(e => res.send(e))
}

exports.postWho = (req, res) => {
	let reqData = req.body
	if (config.get('pass') == reqData.pass) {
		Fuser.findOne({username: reqData.name})
		.then(user => {
			if (!user) {
				let fuser = new Fuser({ username: reqData.name, wordsAmount: 0 })
				fuser.save(err => err && logger.error(err))
				logger.info(`New user ${reqData.name} has registered`)
				req.session.user = fuser
				res.send(fuser)
			} else {
				logger.info(`${reqData.name} logged on`)
				req.session.user = user
				res.send(user)
			}
			req.session.save(e => e && logger.error(e))
		})
		.catch(e => logger.error(e))
	} else
		res.send('wrong')
}

exports.postTranslate = (req, res) => {
	let body = req.body

	translate(body.text, { from: body.from, to: body.to, raw: true })
	.then(result => {
		let a = eval(result.raw)
		res.send(a[0][0][0])
	})
}