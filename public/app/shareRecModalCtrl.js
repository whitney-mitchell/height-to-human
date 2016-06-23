'use strict';

angular.module('app')
	.controller('shareRecentCtrl', function(DataFactory, $uibModalInstance, $scope, recentCon, recent) {
		const shareRecent = this;
		shareRecent.clicked = recentCon.recent
		console.log("var", shareRecent.clicked);

		// shareRecent.clicked = function(recentCon) {
		// 	for (var i =0; i <= recentCon.recent.length; i+=1) {
		// 		// if ()
		// 	}
		// }
		// shareRecent.recentCollec = recentCon.recent[i]
// console.log(shareRecent.recentCollec);
		// shareRecent.getRecent = DataFactory.recentList ()
		// 	.then(function (resolve) {
		// 		return shareRecent.recent = resolve;

		// 	})
			// .then(() => {
			// 	for (var i = 0; i <= shareRecent.recent.length; i+=1)
			// 		if (shareRecent.recent.name ===   && shareRecent.recent.structure ===)

			// })

		shareRecent.closeRec = function() {
			$uibModalInstance.close();
		}
	})
