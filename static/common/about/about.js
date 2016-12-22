angular.module( "Canteen.About", [ "ngCookies"] )

.controller( "AboutDialogCtrl", [ "$scope", "$uibModalInstance",
function( $scope, $uibModalInstance )
{
	$scope.ok = function()
	{
		$uibModalInstance.dismiss( "ok" );
	};
} ])

;
