angular.module( "Canteen.About", [ "ngCookies"] )

.controller( "AboutDialogCtrl", [ "$scope", "$uibModalInstance",
function( $scope, $uibModalInstance )
{
	$scope.ok = () => $uibModalInstance.dismiss( "ok" );
} ])

;
