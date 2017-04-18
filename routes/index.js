const main = require('./main')

module.exports = function (app) {
	app.get('/', main.getRoot)
	app.get('/home', main.getHome)

	app.get('/words', main.getWords)
	app.post('/words', main.postWords)
	app.delete('/words/:id', main.deleteWords)

	app.get('/who', main.getWho)
	app.post('/who', main.postWho)
}