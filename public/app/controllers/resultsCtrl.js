'use strict';

angular.module('app')
	.controller('ResultsCtrl', function(DataFactory, $scope, $timeout, $routeParams, $uibModal) {
		const results = this;

		// Opens and routes recentCon modal
		results.openRec = function() {
		var recentModal = $uibModal.open({
			controller: 'recModalCtrl',
			controllerAs: 'recentCon',
			templateUrl: 'app/partials/modalPopular.html'
			})
		}

		results.person = $routeParams.person;
		results.structure = $routeParams.structure;

		//Get people data
		results.getPeople = DataFactory.personList ()
			.then(function (resolve) {
				return results.people = resolve;
			})
		// Get person data that corresponds to result.person, the user-selected person.
			.then(() => {
				for (var i = 0; i <= results.people.length; i+=1)
					if (results.people[i].name === results.person) {
						results.personObj = results.people[i];
						return results.personObj;
					}
			})
		// Get structure data
		results.getStructs = DataFactory.structureList ()
			.then(function (resolve) {
				return results.structs = resolve;
			})
			// Get structure data that corresponds to result.strucure, the user-selected structure.
			.then(() => {
				for (var i = 0; i <= results.structs.length; i+=1)
					if (results.structs[i].name === results.structure) {
						results.structureObj = results.structs[i];
						return results.structureObj
					}
			})
			// Convert it! And save as a new object for Firebase
			.then((structureObj, personObj) => {
				results.height = Math.round((results.structureObj.height)/(results.personObj.height) * 100)/ 100;
				results.converted = {
					'structure': results.structure,
					'name': results.person,
					'conversion': results.height,
					'date': Date.now()
				}
			})
			//Send to database of recent searches
			.then((converted)=> {
				firebase.database().ref('recent').push(results.converted)
			})
		//Below deals with Sharing/copying to clipboard
		results.title = 'Copy URL';
		results.supported = false;
		results.textToCopy = location.href;
		results.success = function () {
			console.log('Copied!');
			results.title = 'Copied!';
		};
		results.fail = function (err) {
			console.error('Error!', err);
			results.title = 'Try Again!';
		};
	})
