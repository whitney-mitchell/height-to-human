'use strict';

angular.module('app')
	.factory('DataFactory', function($http) {

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

		return {
			personList () {
				return people
			},
			structureList () {
				return structs
			},
			bothList () {
				return {
					people,
					structs
				}
			}
			// 	.then(() => {
			// 	console.log(666);
			// 	for (var i = 0; i <= results.people.length; i+=1)
			// 		if (results.people[i].name === results.person) {
			// 			results.personObj = results.people[i];
			// 			console.log("personObj", results.personObj)
			// 			return results.personObj
			// 		}
			// })
			// },
			// structRequest () {

			// }

		}


	})
