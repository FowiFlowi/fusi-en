app.controller('authController', ['$scope', '$http', 'users' , function($scope, $http, users) {
	$scope.firstClick = false
	$scope.buttonText = 'WhoAreYou?'

	$scope.who = function() {
		$scope.firstClick = true
		$scope.buttonText = 'ok'

		if ($scope.name && $scope.pass) {
			$http.post('/who', {
				name: $scope.name,
				pass: $scope.pass
			})
			.then(res => {
				if (res.data != 'wrong') {
					Object.assign($scope.user, res.data)

					$scope.user.isAuth = true
					users.push(res.data)
				} else
					$scope.wrong = 'Wrong password :c'

				$scope.pass = ''
			})
		}
	}
}])