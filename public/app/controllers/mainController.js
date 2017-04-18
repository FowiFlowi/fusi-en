app.controller('mainController', ['$scope', 'users', function($scope, users) {
	$scope.loading = {
		ready: false,
		length: 2
	}

	$scope.hideFooter = false
	$scope.setHideFooter = trueOrFalse => $scope.hideFooter = trueOrFalse

	users.get().then(users => {
		$scope.user = users.user
		$scope.userList = users.list

		$scope.loading.length--
		if (!$scope.loading.length) {
			$scope.loading.ready = true
			$scope.loading.displayStyle = 'inline'
		}
	})
}])