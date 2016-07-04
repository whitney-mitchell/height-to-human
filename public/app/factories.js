'use strict';

angular.module('app')
	.factory('DataFactory', function($http, $timeout) {

		const personUrl = 'https://heighttohuman.firebaseio.com/person';
		const structureUrl = 'https://heighttohuman.firebaseio.com/structure';
		const recentUrl = 'https://heighttohuman.firebaseio.com/recent';


		const people = $http.get(`${personUrl}.json`)
			.then((response) => {
				return response.data;
      })

		const structs = $http.get(`${structureUrl}.json`)
			.then((response) => {
				return response.data;
			})

		let recent;
		firebase.database().ref('recent')
			.orderByChild('date')
			.limitToLast(10)
			.once('value', (snap) => {
				recent = snap.val();
			})


		return {
			personList () {
				return $timeout(()=>{}, 500).then(() => people)
			},
			structureList () {
				return $timeout(()=>{}, 500).then(() => structs)
			},
			recentList () {
				return $timeout(()=>{}, 500).then(() => recent)
			}

		}
	})
