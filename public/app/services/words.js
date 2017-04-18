app.service('words', ['$http', '$q', function($http, $q) {
	let def = $q.defer(),
		list = []

	$http.get('/words').then(res => {
		list = res.data
		def.resolve(list)
	})
	.catch(e => def.reject(e))

	this.get = () => def.promise

	this.push = wordData => list.push(wordData)

	this.remove = wordData => list.forEach((word, i) => word._id == wordData._id ? list.splice(i, 1) : '')
}])