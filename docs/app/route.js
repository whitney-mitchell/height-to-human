'use strict';

angular.module('app')
	.config(() => (
		firebase.initializeApp({
			apiKey: 'AIzaSyDe1hquqY6Bf1LqTkXO4tLQTWI0UpbpaLE',
			authDomain: 'heighttohuman.firebaseapp.com',
			databaseURL: 'https://heighttohuman.firebaseio.com',
			storageBucket: 'heighttohuman.appspot.com'
			})
	))
	.config(($routeProvider) => (
		$routeProvider
			.when('/', {
				controller: 'MainCtrl',
				controllerAs: 'main',
				templateUrl: 'app/partials/landing.html'
			})
			.when('/results', {
				controller: 'ResultsCtrl',
				controllerAs: 'results',
				templateUrl: 'app/partials/results.html'
			})
			.when('/resultsUser', {
				controller: 'ResultsUserCtrl',
				controllerAs: 'resultsUser',
				templateUrl: 'app/partials/resultsUser.html'
			})

			.otherwise('/')
	))
