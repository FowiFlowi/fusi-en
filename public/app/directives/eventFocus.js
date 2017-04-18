app.directive('eventFocus', ['focus', function(focus) {
	return (scope, elem, attr) => {
		elem.on(attr.eventFocus, () => focus(attr.eventFocusId))

		elem.on('$destroy', () => element.off(attr.eventFocus))
	}
}])