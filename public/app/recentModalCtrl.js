'use strict';

angular.module('app')
	.controller('recModalCtrl', function(DataFactory, $scope, $uibModal, $uibModalInstance) {
		const recentCon = this;

		//Get data
		recentCon.getRecent = DataFactory.recentList ()
			.then(function (resolve) {
				return recentCon.recent = resolve;

			})



		// recentCon.showShareLink = false;
		// recentCon.showUrl = function () {
		// 	recentCon.showShareLink = !recentCon.showShareLink;
		// 	console.log("recent");
		// }
		// //Function for ng-click on Share Button
		// recentCon.shareRec = function(recent) {

		// 	// console.log("recent", recent);
		// 	var shareRecModal = $uibModal.open({
		// 		controller: 'shareRecentCtrl',
		// 		controllerAs: 'shareRecent',
		// 		templateUrl: 'app/partials/modalShareRecent.html',
  //       // scope: recentCon.recent,
		// 		resolve: {
  //       	recentCon: function() {
  //           return $scope.recentCon
  //       	},

  //       	recent: function() {
  //       		return recentCon.recent
  //       	}

  //     	}
		// 	})

		// }
		//Close Modal
		recentCon.closeRec = function() {
			$uibModalInstance.close();
		}

	})
