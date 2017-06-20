angular.module( "Canteen.Supply", ["ui.bootstrap", "Canteen.Services"] )

.controller( "SupplyCtrl", [ "$scope", "Product",
function ( $scope, Product )
{
	$scope.loading = true;
	$scope.isAddProductFormCollapsed = true;
	
	let GetAllProducts = ( order ) => Product.query( {}, ( data, headers ) => $scope.products = data.product ).$promise;
	
	$scope.AddProduct = () => Product.save( { name: $scope.productName, price: $scope.productPrice, stock: $scope.productStock || 0 }, ( productId ) =>
	{
		$scope.productName = undefined;
		$scope.productPrice = undefined;
		GetAllProducts();
	} );

	$scope.DeleteProduct = ( newProduct ) =>
	{
		Product.get( { id: newProduct.id }, ( prod ) => prod.$delete( { id: prod.product.id }, () => GetAllProducts() ) );
	};

	$scope.StartEditing = ( product ) =>
	{
		product.editing = true;
		product.new_name = product.name;
		product.new_price = product.price;
		product.new_stock = product.stock;
	};

	$scope.EditProduct = ( product ) =>
	{
		Product.get( { id: product.id }, ( prod ) =>
		{
			let currentProduct = prod.product;
			currentProduct.name = product.new_name;
			currentProduct.price = product.new_price;
			currentProduct.stock = product.new_stock;
			Product.save( { id: currentProduct.id }, currentProduct, () => GetAllProducts() );
		} ).$promise
		.then( () => product.editing = false )
		.catch( errorDetails =>
		{
			if ( errorDetails )
			{
				$scope.errorMessage = "Error Occurred! " + errorDetails;
			}

			console.log( "Error Occurred!" );
			console.log( errorDetails.data || errorDetails );
		} );
	};

	$scope.CancelEditing = ( product ) => product.editing = false;

	$scope.DeleteCustomer = ( product ) => Product.get( { id: product.id }, ( c ) => c.$delete( { id: c.id }, () => GetAllProducts() ) );

	GetAllProducts()
	.then( () => $scope.loading = false )
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
