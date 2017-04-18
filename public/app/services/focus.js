app.factory('focus', ['$window', '$timeout', function($window, $timeout) {
	return id => {
		$timeout(() => {
			let element = $window.document.getElementById(id)
			if (element) element.focus()			
		})
	}
}])