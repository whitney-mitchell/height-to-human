angular.module('app', ['ngRoute', 'ui.bootstrap'])
	.config(() => (
		firebase.initializeApp({
			apiKey: "AIzaSyDe1hquqY6Bf1LqTkXO4tLQTWI0UpbpaLE",
			authDomain: "heighttohuman.firebaseapp.com",
			databaseURL: "https://heighttohuman.firebaseio.com",
			storageBucket: "heighttohuman.appspot.com"
			})
	))

	.controller('MainCtrl', function($http, $scope) {
		const main = this;
		const personUrl = 'https://heighttohuman.firebaseio.com/person';
		const structureUrl = 'https://heighttohuman.firebaseio.com/structure';
		main.heading = "HEIGHT TO HUMAN";
		// main.Math = window.Math;
		main.convertData = function (selectedPerson, selectedStructure) {
			console.log("click");
			main.conversion = Number($scope.selectedStructure) / Number($scope.selectedPerson);
			console.log(main.conversion);
		}

		//Get data
		$http.get(`${personUrl}.json`)
			.then((response) => {
    		console.log(`${personUrl}.json`, response.data)
      	main.people = response.data;
      })

    $http.get(`${structureUrl}.json`)
			.then((response) => {
				console.log(`${structureUrl}.json`, response.data)
				main.structs = response.data;
    	})


  })

	// 	function() {
	// 		firebase.database().ref('/person')
	// 	}

	// })
