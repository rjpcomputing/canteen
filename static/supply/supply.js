angular.module( "Canteen.Supply", ["ui.bootstrap", "Canteen.Services"] )

.controller( "SupplyCtrl", [ "$scope",
function( $scope )
{
	$scope.isAddProductFormCollapsed = true;
} ])

;
