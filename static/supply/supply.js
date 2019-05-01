angular.module( "Canteen.Supply", ["ui.bootstrap", "Canteen.Services"] )

	.controller( "SupplyCtrl", ["$scope", "Product", "UI",
		function( $scope, Product, UI ) {
			$scope.loading = true;
			$scope.isAddProductFormCollapsed = true;

			let GetAllProducts = ( _order ) => Product.query( {}, ( data ) => $scope.products = data.product ).$promise;

			let GetCustomerTypes = () => UI.producttypes( ( data ) => {
				$scope.productTypes = data.product_type;
				$scope.selectedProductType = $scope.productTypes[0];
			} ).$promise;

			$scope.AddProduct = () => Product.save( { name: $scope.productName, cost: $scope.productCost, price: $scope.productPrice, stock: $scope.productStock || 0, type_id: $scope.selectedProductType.id }, ( _productId ) => {
				$scope.productName = undefined;
				$scope.productCost = undefined;
				$scope.productPrice = undefined;
				$scope.selectedProductType = $scope.productTypes[0];
				GetAllProducts();
			} );

			$scope.DeleteProduct = ( newProduct ) => {
				Product.get( { id: newProduct.id }, ( prod ) => prod.$delete( { id: prod.product.id }, () => GetAllProducts() ) );
			};

			$scope.StartEditing = ( product ) => {
				product.editing = true;
				product.new_name = product.name;
				product.new_price = product.price;
				product.new_stock = product.stock;
				product.new_type = { id: product.type_id, type: product.type };
			};

			$scope.EditProduct = ( product ) => {
				Product.get( { id: product.id }, ( prod ) => {
					let currentProduct = prod.product;
					currentProduct.name = product.new_name;
					currentProduct.price = product.new_price;
					currentProduct.stock = product.new_stock;
					currentProduct.type_id = product.new_type.id;
					currentProduct.type = product.new_type.type;
					Product.save( { id: currentProduct.id }, currentProduct, () => GetAllProducts() );
				} ).$promise
					.then( () => product.editing = false )
					.catch( errorDetails => {
						if ( errorDetails ) {
							$scope.errorMessage = "Error Occurred! " + errorDetails;
						}

						console.log( "Error Occurred!" );
						console.log( errorDetails.data || errorDetails );
					} );
			};

			$scope.CancelEditing = ( product ) => product.editing = false;

			$scope.DeleteCustomer = ( product ) => Product.get( { id: product.id }, ( c ) => c.$delete( { id: c.id }, () => GetAllProducts() ) );

			GetAllProducts()
				.then( GetCustomerTypes )
				.then( () => $scope.loading = false )
				.catch( errorDetails => {
					if ( errorDetails ) {
						$scope.errorMessage = "Error Occurred! " + errorDetails;
					}

					console.log( "Error Occurred!" );
					console.log( errorDetails.data || errorDetails );
				} );
		}] )

;
