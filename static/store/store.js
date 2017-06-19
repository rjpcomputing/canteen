angular.module( "Canteen.Store", [ "ui.bootstrap", "Canteen.Services" ] )

.controller( "StoreCtrl", [ "$scope", "$cookies", "$filter", "$uibModal", "Event", "Product",
function( $scope, $cookies, $filter, $uibModal, Event, Product )
{
	$scope.loading = true;
	let displayDetails = $cookies.getObject( $scope.displayCookieName );

	let GetAllEvents = ( order ) => Event.query( {}, ( data, headers ) => $scope.events = data ).$promise;
	let GetAllProducts = ( order ) => Product.query( {}, ( data, headers ) => $scope.products = data.product ).$promise;

	$scope.GetEventsCustomers = ( event ) =>
	{
		Event.customers( { id: event.id }, {}, ( data, headers ) =>
		{
			displayDetails.store.selectedEvent = event;
			$cookies.putObject( $scope.displayCookieName, displayDetails );

			$scope.customers = data.customer;
		} );
	};

	$scope.FormatEventName = ( event ) => event.description + '  (' + $filter( "date" )( event.start_date ) + ' - ' + $filter( "date" )( event.end_date ) + ")";
	$scope.Shop = ( $event, customer ) =>
	{
		$event.stopPropagation();
		var modalInstance = $uibModal.open(
		{
			templateUrl: "store/shop-dialog.html",
			controller: "ShopDialogCtrl",
			size: "lg",
			backdrop: "static",
			resolve:
			{
				customer: function() { return customer; },
				event: function() { return $scope.currentEvent; }
			}
		} );

		modalInstance.result.then( ( purchaseDetail ) => $scope.GetEventsCustomers( $scope.currentEvent ) );
	};
	
	GetAllEvents()
	.then( () =>
	{
		if( displayDetails.store.selectedEvent )
		{
			$scope.currentEvent = displayDetails.store.selectedEvent;
		}
		$scope.GetEventsCustomers( displayDetails.store.selectedEvent )
	} )
	.then( () => GetAllProducts() )
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
} ]);