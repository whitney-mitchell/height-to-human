angular.module('app', ['ngRoute', 'ui.bootstrap'])
	.config(() => (
		firebase.initializeApp({
			apiKey: 'AIzaSyDe1hquqY6Bf1LqTkXO4tLQTWI0UpbpaLE',
			authDomain: 'heighttohuman.firebaseapp.com',
			databaseURL: 'https://heighttohuman.firebaseio.com',
			storageBucket: 'heighttohuman.appspot.com'
			})
	))

	.controller('MainCtrl', function($http, $scope, $location) {
		const main = this;
		const personUrl = 'https://heighttohuman.firebaseio.com/person';
		const structureUrl = 'https://heighttohuman.firebaseio.com/structure';

		//Convert user selected data, result = the selectd structure measured in
		//the selected person's height. Also, on click route to results page.
		main.convertData = function (selectedPerson, selectedStructure) {
			main.conversion = Number($scope.selectedStructure) / Number($scope.selectedPerson);
			console.log(main.conversion);
			$location.path('/results');
		}

		//Get data
		$http.get(`${personUrl}.json`)
			.then((response) => {
				main.people = response.data;
      })

		$http.get(`${structureUrl}.json`)
			.then((response) => {
				main.structs = response.data;
			})


  })
