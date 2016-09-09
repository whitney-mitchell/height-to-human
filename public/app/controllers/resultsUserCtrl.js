'use strict';

angular.module('app')
	.controller('ResultsUserCtrl', function(DataFactory, $scope, $timeout, $routeParams, $uibModal) {
		const resultsUser = this;

		// Opens and routes recentCon modal
		resultsUser.openRec = function() {
			var recentModal = $uibModal.open({
				controller: 'recModalCtrl',
				controllerAs: 'recentCon',
				templateUrl: 'app/partials/modalRecent.html'
				})
			}

		resultsUser.heightIn = $routeParams.heightI;
		resultsUser.heightFt = $routeParams.heightF;
		resultsUser.person = $routeParams.person;
		resultsUser.structure = $routeParams.structure;

		// Convert feet to in
		resultsUser.userHeight = (12 * Number(resultsUser.heightFt) + Number(resultsUser.heightIn));

		// Get structure data, then loop through to find match to user selected structure.
		resultsUser.getStructs = DataFactory.structureList ()
			.then(function (resolve) {
				return resultsUser.structs = resolve;
			})
			.then(() => {
				for (var i = 0; i <= resultsUser.structs.length; i+=1)
					if (resultsUser.structs[i].name === resultsUser.structure) {
						resultsUser.structureObj = resultsUser.structs[i];
						return resultsUser.structureObj;
					}
			})
			.then((person, userHeight) => {
				resultsUser.personObj = {
					'height' : resultsUser.userHeight,
					'name' : resultsUser.person
				}

			})

			// Convert it! And save as a new object for Firebase
			.then((structureObj, personObj) => {
				resultsUser.height = Math.round((resultsUser.structureObj.height)/(resultsUser.personObj.height) * 100)/ 100;
				console.log('height', resultsUser.height);
				resultsUser.converted = {
					'structure': resultsUser.structure,
					'name': resultsUser.person,
					'conversion': resultsUser.height
				}
			})
			//Send to database of user conversions
			.then((converted)=> {
				firebase.database().ref('userConversions').push(resultsUser.converted)
			})

		//Below deals with Sharing/copying to clipboard
		resultsUser.title = 'Copy URL';
		resultsUser.supported = false;
		resultsUser.textToCopy = location.href;
		resultsUser.success = function () {
			resultsUser.title = 'Copied!';
		};
		resultsUser.fail = function (err) {
			resultsUser.title = 'Try Again.';
		};
	})
