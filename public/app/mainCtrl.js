'use strict';

angular.module('app')
.controller('MainCtrl', function(DataFactory, $scope, $timeout, $location) {
		const main = this;

		// Get persons data
		main.getPerson = DataFactory.personList ()
			.then(function (resolve) {
				return main.people = resolve;
			});

		main.getStructs = DataFactory.structureList ()
			.then(function (resolve) {
				return main.structs = resolve;
			});
		console.log(main.getPeople, main.getStructs);

		// On click route to results page, sending person's name
		// and structure's name through query string..
		main.gatherData = function () {
			$location.path('/results').search({
				person: main.selectedPerson.name,
				structure: main.selectedStructure.name
			})
		}

		//function to send user input to location.path '/resultsUser'
		main.gatherUserData = function () {
			main.userFt
			main.userIn
			$location.path('/resultsUser').search({
				heightF: main.userFt,
				heightI: main.userIn,
				person: main.userName,
				structure: main.selectedStructure2.name
			})
		}
	})
