angular.module( "Canteen.ShopDialog", [ "ui.bootstrap", "Canteen.Services" ] )

.controller( "ShopDialogCtrl", [ "$scope", "$uibModalInstance", "customer", "event", "Product", "Customer", "CanteenSettings",
function( $scope, $uibModalInstance, customer, event, Product, Customer, CanteenSettings )
{
	$scope.customer = customer;
	$scope.event = event;
	$scope.shoppingCart = [];
	$scope.shoppingCartTotal = 0;
	$scope.customersEndingBalance = customer.balance;
	
	let GetAllProducts = ( order ) => Product.query( {}, ( data, headers ) => $scope.products = data.product ).$promise;

	$scope.AddProductToCart = ( product ) =>
	{
		product.sold_price = product.price;		// Normal price. No discount
		
		if ( customer.type === "Summer Staff" || customer.type === "Permanent Staff" )
		{
			if ( product.type === "Canteen" )
			{
				product.sold_price = product.price * ( CanteenSettings.canteenDiscount / 100 );
			}
		}

		if ( customer.type === "Permanent Staff" )
		{
			if ( product.type === "Store" )
			{
				product.sold_price = product.cost + CanteenSettings.staffAboveCost;
			}
		}

		$scope.shoppingCartTotal += product.sold_price;
		$scope.customersEndingBalance -= product.sold_price;

		$scope.shoppingCart.push( product );
	};

	$scope.DeleteProductFromCart = ( index ) =>
	{
		$scope.shoppingCartTotal -= $scope.shoppingCart[index].sold_price;
		$scope.customersEndingBalance += $scope.shoppingCart[index].sold_price;
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
