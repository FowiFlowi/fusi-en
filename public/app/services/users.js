app.service('users', ['$http', '$q', function($http, $q) {
	let def = $q.defer(),
		list, user

	$http.get('/who').then(res => {
		list = res.data,
		user = list[0] || {},
		list = list.slice(1)

		user.username ? user.isAuth = true : user.isAuth = false
		return def.resolve({ list, user })
	})
	.catch(e => def.reject(e))

	this.get = () => def.promise

	this.push = user => {
		let flag = true
		list.forEach(i => i.username == user.username ? flag = false : '')

		if (flag) list.push(user)
	}
}])