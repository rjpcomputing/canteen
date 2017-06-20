angular.module( "Canteen.ShopDialog", [ "ui.bootstrap", "Canteen.Services" ] )

.controller( "ShopDialogCtrl", [ "$scope", "$uibModalInstance", "customer", "event", "Product", "Customer",
function( $scope, $uibModalInstance, customer, event, Product, Customer )
{
	$scope.customer = customer;
	$scope.event = event;
	$scope.shoppingCart = [];
	$scope.shoppingCartTotal = 0;
	$scope.customersEndingBalance = customer.balance;

	let GetAllProducts = ( order ) => Product.query( {}, ( data, headers ) => $scope.products = data.product ).$promise;

	$scope.AddProductToCart = ( product ) =>
	{
		$scope.shoppingCartTotal += product.price;
		$scope.customersEndingBalance -= product.price;

		$scope.shoppingCart.push( product );
	};

	$scope.DeleteProductFromCart = ( index ) =>
	{
		$scope.shoppingCartTotal -= $scope.shoppingCart[index].price;
		$scope.customersEndingBalance += $scope.shoppingCart[index].price;
		$scope.shoppingCart.splice( index, 1 );
	};

	$scope.Checkout = () =>
	{
		let newPurchaseDetails =
		{
			amount: $scope.shoppingCartTotal,
			product: $scope.shoppingCart
		};

		Customer.addpurchase( { id: customer.id }, newPurchaseDetails, ( purchase ) => $uibModalInstance.close( purchase ) );
	};
	$scope.Cancel = () => $uibModalInstance.dismiss( "cancel" );

	GetAllProducts()
	.catch( errorDetails =>
	{
		if ( errorDetails )
		{
			$scope.errorMessage = "Error Occurred! " + errorDetails;
		}

		console.log( "Error Occurred!" );
		console.log( errorDetails.data || errorDetails );
	} );
} ])

;
