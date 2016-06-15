angular.module('app')
	.config(($routeProvider) => (
		$routeProvider
			.when('/', {
				controller: 'MainCtrl',
				controllerAs: 'main',
				templateUrl: 'app/partials/landing.html'
			})
			.when('/results', {
				controller: 'MainCtrl',
				controllerAs: 'main',
				templateUrl: 'app/partials/results.html'
			})

	))
