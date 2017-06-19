angular.module( "Canteen.Customer", ["Canteen.Services"] )

.controller( "CustomerCtrl", [ "$scope", "$stateParams", "Purchase", "Customer",
function( $scope, $stateParams, Purchase, Customer )
{
	$scope.loading = true;
	let GetCustomer = ( order ) => Customer.query( { id: $stateParams.id }, ( data, headers ) => $scope.customer = data.customer ).$promise;
	let GetPurchases = ( order ) => Customer.purchases( { id: $stateParams.id }, ( data, headers ) => $scope.purchases = data.purchase ).$promise;

	GetCustomer()
	.then( GetPurchases )
	.then( () => $scope.loading = false )
	.catch( errorDetails =>
	{
		if ( errorDetails )
		{
			$scope.errorMessage = "Error Occurred! " + errorDetails.message;
		}

		console.log( "Error Occurred!" );
		console.log( errorDetails );
	} );
} ] )

;
