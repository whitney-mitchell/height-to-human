'use strict';

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
				// controller: 'ResultsCtrl',
				// controllerAs: 'results',
				templateUrl: 'app/partials/results.html'
			})
			.when('/resultsUser', {
				controller: 'MainCtrl',
				controllerAs: 'main',
				templateUrl: 'app/partials/resultsUser.html'
			})

			.otherwise('/')
	))
