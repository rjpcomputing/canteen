angular.module( "Canteen.About", ["ngCookies"] )

	.controller( "AboutDialogCtrl", ["$scope", "$uibModalInstance",
		function( $scope, $uibModalInstance ) {
			$scope.copyrightYear = new Date().getFullYear();
			$scope.ok = () => $uibModalInstance.dismiss( "ok" );
		}] )

;
