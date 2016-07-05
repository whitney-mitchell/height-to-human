'use strict';

angular.module('app')
.controller('MainCtrl', function(DataFactory, $scope, $timeout, $location, $uibModal) {
		const main = this;

		// Opens and routes recentCon modal
		main.openRec = function() {
			var recentModal = $uibModal.open({
				controller: 'recModalCtrl',
				controllerAs: 'recentCon',
				templateUrl: 'app/partials/modalPopular.html'
				})
			}

		// Get persons data
		main.getPerson = DataFactory.personList ()
			.then(function (resolve) {
				return main.people = resolve;
			});

		main.getStructs = DataFactory.structureList ()
			.then(function (resolve) {
				return main.structs = resolve;
			});

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
			$location.path('/resultsUser').search({
				heightF: main.userFt,
				heightI: main.userIn,
				person: main.userName,
				structure: main.selectedStructure2.name
			})
		}
	})
