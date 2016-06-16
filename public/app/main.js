'use strict';

angular.module('app', ['ngRoute', 'ui.bootstrap'])
	.config(() => (
		firebase.initializeApp({
			apiKey: 'AIzaSyDe1hquqY6Bf1LqTkXO4tLQTWI0UpbpaLE',
			authDomain: 'heighttohuman.firebaseapp.com',
			databaseURL: 'https://heighttohuman.firebaseio.com',
			storageBucket: 'heighttohuman.appspot.com'
			})
	))
	//MainCtrl
	.controller('MainCtrl', function($http, $scope, $location) {
		const main = this;
		main.heading = "heyo"
		const personUrl = 'https://heighttohuman.firebaseio.com/person';
		const structureUrl = 'https://heighttohuman.firebaseio.com/structure';

		//Get data
		$http.get(`${personUrl}.json`)
			.then((response) => {
				main.people = response.data;
      })

		$http.get(`${structureUrl}.json`)
			.then((response) => {
				main.structs = response.data;
			})

		//Convert user selected data, result = the selected structure measured in
		//the selected person's height. Also, on click route to results page,
		// sending new converted obj through query string.
		main.convertData = function () {
			main.conversion = Math.round((main.selectedStructure.height)/(main.selectedPerson.height) * 100)/ 100;
			console.log(main.conversion);
			//query string to send new converted obj between views.
			$location.path('/results');
			var resultsPath = `converted=${main.conversion}&personHeight=${main.selectedPerson.height}`+
			`&personName=${main.selectedPerson.name}&structureHeight=${main.selectedStructure.height}&structureName=${main.selectedStructure.name}`;
			$location.search(resultsPath);
		}
		//save new obj for accessibility.
		let convertObj = $location.search();
		main.convObj = convertObj;

		main.convertUser = function () {
			//Convert feet to in
			main.userHeight = (12 * Number(main.userFt) + Number(main.userIn));
			//Convert user height to building height
			main.userConversion = Math.round((main.selectedStructure2.height)/(main.userHeight) * 100) / 100;
			console.log(main.userHeight, main.userConversion);
			//query string to send new converted obj between views.
			$location.path('/resultsUser');
			var resultsUserPath =`converted=${main.userConversion}&personHeight=${main.userHeight}&personName=${main.userName}` +
			`&structureHeight=${main.selectedStructure2.height}&structureName=${main.selectedStructure2.name}`;
			$location.search(resultsUserPath);
		}
		//save new obj for accessibility.
		let convertUserObj = $location.search();
		console.dir(convertUserObj);
		main.convUserObj = convertUserObj;



  })



  //.controller('ResultsCtrl', function($scope, ResultsFactory) {
  //	const results = this;
  	// results.heading = "Yoyoyoyo";

  //})
