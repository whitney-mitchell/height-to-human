'use strict';

angular.module('app')
	.controller('recModalCtrl', function(DataFactory, $scope, $uibModal, $uibModalInstance) {
		const recentCon = this;

		//Get data
		recentCon.getRecent = DataFactory.recentList ()
			.then(function (resolve) {
				return recentCon.recent = resolve;
			})

		//Close Modal
		recentCon.closeRec = function() {
			$uibModalInstance.close();
		}
	})
