angular.module( "Canteen.Store", ["ui.bootstrap", "Canteen.Services"] )

	.controller( "StoreCtrl", ["$scope", "$cookies", "$filter", "$state", "$uibModal", "Event", "Product",
		function( $scope, $cookies, $filter, $state, $uibModal, Event, Product ) {
			$scope.loading = true;
			$scope.showAllEvents = false;
			let displayDetails = $cookies.getObject( $scope.displayCookieName );

			let GetAllEvents = ( _order ) => {
				if ( $scope.showAllEvents ) {
					return Event.query( {}, ( data ) => $scope.events = data ).$promise;
				} else {
					return Event.query( { year: new Date().getFullYear() }, ( data ) => $scope.events = data ).$promise;
				}
			};

			let GetAllProducts = ( _order ) => Product.query( {}, ( data ) => $scope.products = data.product ).$promise;

			$scope.UpdateAllEvents = GetAllEvents;

			$scope.FormatEventName = ( event ) => event.description + "  (" + $filter( "date" )( event.start_date ) + " - " + $filter( "date" )( event.end_date ) + ")";

			$scope.CustomerDetails = ( $event, customer ) => {
				$event.stopPropagation();
				$state.go( "customer", { id: customer.id } );
			};

			$scope.GetEventsCustomers = ( event ) => {
				Event.customers( { id: event.id }, {}, ( data ) => {
					displayDetails.store.selectedEvent = event;
					$cookies.putObject( $scope.displayCookieName, displayDetails );

					$scope.customers = data.customer;
				} );
			};

			$scope.Shop = ( $event, customer ) => {
				$event.stopPropagation();
				var modalInstance = $uibModal.open(
					{
						templateUrl: "store/shop-dialog.html",
						controller: "ShopDialogCtrl",
						size: "lg",
						backdrop: "static",
						resolve:
						{
							customer: function() {
								return customer;
							},
							event: function() {
								return $scope.currentEvent;
							}
						}
					} );

				modalInstance.result.then( ( _purchaseDetail ) => $scope.GetEventsCustomers( $scope.currentEvent ) );
			};

			$scope.UpdateAllEvents()
				.then( () => {
					if ( displayDetails.store.selectedEvent ) {
						$scope.currentEvent = displayDetails.store.selectedEvent;
					}
					$scope.GetEventsCustomers( displayDetails.store.selectedEvent );
				} )
				.then( () => GetAllProducts() )
				.then( () => $scope.loading = false )
				.catch( errorDetails => {
					if ( errorDetails ) {
						$scope.errorMessage = "Error Occurred! " + errorDetails;
					}

					console.log( "Error Occurred!" );
					console.log( errorDetails.data || errorDetails );
				} );
		}] );
