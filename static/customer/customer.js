angular.module( "Canteen.Customer", ["Canteen.Services"] )

.controller( "CustomerCtrl", [ "$scope", "$stateParams", "$uibModal", "Purchase", "Customer",
function( $scope, $stateParams, $uibModal, Purchase, Customer )
{
	$scope.loading = true;
	let GetCustomer = ( order ) => Customer.query( { id: $stateParams.id }, ( data, headers ) => $scope.customer = data.customer ).$promise;
	let GetPurchases = ( order ) => Customer.purchases( { id: $stateParams.id }, ( data, headers ) => $scope.purchases = data.purchase ).$promise;

	$scope.ShowPurchase = ( $event, purchase ) =>
	{
		$event.stopPropagation();
		var modalInstance = $uibModal.open(
		{
			templateUrl: "customer/purchase-item-dialog.html",
			controller: "PurchaseItemDialogCtrl",
			backdrop: "static",
			resolve:
			{
				customer: function() { return $scope.customer; },
				purchase: function() { return purchase; }
			}
		} );
	};

	GetCustomer()
	.then( GetPurchases )
	.then( () => $scope.loading = false )
	.catch( errorDetails =>
	{
		if ( errorDetails )
		{
			$scope.errorMessage = "Error Occurred! " + ( errorDetails.message || errorDetails.data.message );
		}

		console.log( "Error Occurred!" );
		console.log( errorDetails );
	} );
} ] )

;
