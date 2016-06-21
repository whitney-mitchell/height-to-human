'use strict';

angular.module('app', ['ngRoute', 'ui.bootstrap'])


	// let person = `{'name:' ${main.selectedPerson.name}, 'height:' ${main.selectedPerson.height}}`;
	// let structure = `{'name:' ${main.selectedStructure.name}, 'height:' ${main.selectedStructure.height}}`;
	// console.log("person", person, "structure", structure);
	//query string to send new converted obj between views.
	// console.log(`/results?personName=${main.selectedPerson.name}&structureName=${main.selectedStructure.name}`)
	// $location.search(`#/results?personName=Scott`);


		// main.convertUser = function () {
		// 	//Convert feet to in
		// 	main.userHeight = (12 * Number(main.userFt) + Number(main.userIn));
		// 	//Convert user height to building height
		// 	main.userConversion = Math.round((main.selectedStructure2.height)/(main.userHeight) * 100) / 100;
		// 	console.log(main.userHeight, main.userConversion);
		// 	//query string to send new converted obj between views.
		// 	$location.path('/resultsUser');
		// 	var resultsUserPath =`converted=${main.userConversion}&personHeight=${main.userHeight}&personName=${main.userName}` +
		// 	`&structureHeight=${main.selectedStructure2.height}&structureName=${main.selectedStructure2.name}`;
		// 	$location.search(resultsUserPath);
		// }
		// //save new obj for accessibility.
		// let convertUserObj = $location.search();
		// console.log(convertUserObj);
		// main.convUserObj = convertUserObj;

		//send conversion obj to database
		// main.addRecentCon = function (id, convUserObj) {
		// 	console.log(convUserObj)
		// 	firebase.database().ref(`/recent/${id}`)
		// 		.push({
		// 			converted:`${main.userConversion || main.conversion}`,
		// 			personHeight:`${main.userHeight || main.selectedPerson.height}`,
		// 			personName:`${main.userName || main.selectedPerson.name}`,
		// 			structureHeight:`${main.selectedStructure2.height || main.selectedStructure.height}`,
		// 			structureName:`${main.selectedStructure2.name || main.selectedStructure.name}`
		// 		});
		// 	$scope.$apply();
		// }
		// `converted=${main.conversion}&personHeight=${main.selectedPerson.height}`+
				// `&personName=${main.selectedPerson.name}&structureHeight=${main.selectedStructure.height}&structureName=${main.selectedStructure.name}`;

  .controller('ResultsCtrl', function(DataFactory, $scope, $timeout, $routeParams) {
  	const results = this;

  	results.person = $routeParams.person;
  	results.structure = $routeParams.structure;

		//Get people data
		results.getPeople = DataFactory.personList ()
			.then(function (resolve) {
				return results.people = resolve;

			})
		// Get person data that corresponds to result.person, the user-selected person.
			.then(() => {
				console.log(results.people);
				for (var i = 0; i <= results.people.length; i+=1)
					if (results.people[i].name === results.person) {
						results.personObj = results.people[i];
						console.log("personObj", results.personObj)
						return results.personObj
					}
			})
		// Get structure data
		results.getStructs = DataFactory.structureList ()
			.then(function (resolve) {
				return results.structs = resolve;
				console.log(results.structs);
			})
			// Get structure data that corresponds to result.strucure, the user-selected structure.
			.then(() => {
				for (var i = 0; i <= results.structs.length; i+=1)
					if (results.structs[i].name === results.structure) {
						results.structureObj = results.structs[i];
						console.log("structureObj", results.structureObj)
						return results.structureObj
					}
			})
			// Convert it! And save as a new object for Firebase
			.then((structureObj, personObj) => {
				console.log(results.structs);
				results.height = Math.round((results.structureObj.height)/(results.personObj.height) * 100)/ 100;
				console.log("height", results.height);
				results.converted = {
					"structure": results.structure,
					"name": results.person,
					"conversion": results.height
				}
				console.log("converted", results.converted);
			})
			//Send to database of recent searches
			.then((converted)=> {
				firebase.database().ref('recent').push(results.converted)

			})

  })



  .controller('ResultsUserCtrl', function(DataFactory, $scope, $timeout, $routeParams) {
  	const resultsUser = this;

  	resultsUser.heightIn = $routeParams.heightI;
  	resultsUser.heightFt = $routeParams.heightF;
		resultsUser.person = $routeParams.person;
  	resultsUser.structure = $routeParams.structure;


		// Convert feet to in
		resultsUser.userHeight = (12 * Number(resultsUser.heightFt) + Number(resultsUser.heightIn));

		console.log(resultsUser.userHeight);


		// Get structure data, then loop through to find match to user selected structure.
  	resultsUser.getStructs = DataFactory.structureList ()
			.then(function (resolve) {
				return resultsUser.structs = resolve;
			})
			.then(() => {
				for (var i = 0; i <= resultsUser.structs.length; i+=1)
					if (resultsUser.structs[i].name === resultsUser.structure) {
						resultsUser.structureObj = resultsUser.structs[i];
						console.log("structureObj", resultsUser.structureObj)
						return resultsUser.structureObj
					}
			})
			.then((person, userHeight) => {
				resultsUser.personObj = {
					"height" : resultsUser.userHeight,
					"name" : resultsUser.person
				}
				console.log("personObj", resultsUser.personObj);
			})

  		// Convert it! And save as a new object for Firebase
			.then((structureObj, personObj) => {

				resultsUser.height = Math.round((resultsUser.structureObj.height)/(resultsUser.personObj.height) * 100)/ 100;
				console.log("height", resultsUser.height);
				resultsUser.converted = {
					"structure": resultsUser.structure,
					"name": resultsUser.person,
					"conversion": resultsUser.height
				}
				console.log("converted", resultsUser.converted);
			})
			//Send to database of user conversions
			.then((converted)=> {
				firebase.database().ref('userConversions').push(resultsUser.converted)

			})
  })
