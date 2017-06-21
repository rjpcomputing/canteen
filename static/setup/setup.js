angular.module( "Canteen.Setup", ["ui.bootstrap", "Canteen.Services"] )

.controller( "SetupCtrl", [ "$scope",
function( $scope )
{
} ])

.controller( "EventsCtrl", [ "$scope", "$state", "Event",
function( $scope, $state, Event )
{
	$scope.loading = true;
	$scope.isAddEventFormCollapsed = true;

	let GetAllEvents = ( order ) => Event.query( {}, ( data, headers ) => $scope.events = data ).$promise;
	
	$scope.GotoEventDetails = ( eventId ) => $state.go( "event", { id: eventId } );

	$scope.AddEvent = () => Event.save( { description: $scope.eventName, start_date: $scope.eventStartDate, end_date: $scope.eventEndDate }, ( eventId ) =>
	{
		$scope.eventName = undefined;
		$scope.eventStartDate = undefined;
		$scope.eventEndDate = undefined;
		
		GetAllEvents();
	} );

	$scope.DeleteEvent = ( $event, newEvent ) =>
	{
		$event.stopPropagation();
		Event.get( { id: newEvent.id }, ( ev ) => ev.$delete( { id: ev.id }, () => GetAllEvents() ) );
	};

	GetAllEvents()
	.then( () => $scope.loading = false )
	.catch( errorDetails =>
	{
		if ( errorDetails )
		{
			$scope.errorMessage = "Error Occurred! " + errorDetails;
		}

		console.log( "Error Occurred!" );
		console.log( errorDetails );
	} );
} ] )

.controller( "CustomersCtrl", [ "$scope", "$state", "Customer",
function( $scope, $state, Customer )
{
	$scope.loading = true;
	// $scope.editing = false;
	$scope.isAddCustomerFormCollapsed = true;

	let GetAllCustomers = ( order ) => Customer.query( {}, ( data, headers ) => $scope.customers = data.customer ).$promise;
	$scope.GetAllCustomers = GetAllCustomers;

	$scope.AddCustomer = () =>
	{
		Customer.save( { name: $scope.customerName, starting_balance: $scope.customerStartingBalance, balance: $scope.customerStartingBalance }, ( customerId ) =>
		{
			$scope.customerName = undefined;
			$scope.customerStartingBalance = undefined;
			GetAllCustomers();
		} );
	};
	
	$scope.DeleteCustomer = ( customer ) => Customer.get( { id: customer.id }, ( cust ) => cust.$delete( { id: cust.customer.id }, () => GetAllCustomers() ) );

	GetAllCustomers()
	.then( () => $scope.loading = false )
	.catch( ( errorDetails ) =>
	{
		if ( errorDetails )
		{
			$scope.errorMessage = "Error Occurred! " + errorDetails;
		}

		console.log( "Error Occurred!" );
		console.log( errorDetails );
	} );
} ])

;
