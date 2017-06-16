angular.module( "Canteen.Setup", ["ui.bootstrap", "Canteen.Services"] )

.controller( "SetupCtrl", [ "$scope",
function( $scope )
{
} ])

.controller( "EventCtrl", [ "$scope", "$stateParams", "Event", "Customer",
function( $scope, $stateParams, Event, Customer )
{
	$scope.loading = true;
	$scope.isAddCustomerFormCollapsed = true;
	$scope.customerToAdd = undefined;

	let GetEvent = ( eventId ) => Event.get( { id: eventId }, ( data, headers ) => $scope.event = data ).$promise;
	let GetEventsCustomers = ( eventId ) => Event.customers( { id: eventId }, {}, ( data, headers ) => $scope.customers = data.customer ).$promise;
	$scope.GetEventsCustomers = GetEventsCustomers;

	$scope.IsObject = ( obj ) => angular.isObject( obj );
	
	$scope.GetCustomersByName = ( name ) =>
	{
		return Customer.byname( { cmd: name } ).$promise
		.then( ( data, headers ) => data.customer );
	};
	
	$scope.AddCustomer = ( customer ) =>
	{
		Event.addcustomer( { id: $stateParams.id, opt: customer.id }, {}, ( data, headers ) =>
		{
			$scope.customerToAdd = undefined;
			GetEventsCustomers( $stateParams.id );
		} );
	};

	$scope.DeleteCustomer = ( customer ) =>
	{
		Event.deletecustomer( { id: $stateParams.id, opt: customer.id }, {}, ( data, headers ) =>
		{
			GetEventsCustomers( $stateParams.id );
		} );
	};

	GetEvent( $stateParams.id )
	.then( () => GetEventsCustomers( $stateParams.id ) )
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

// allow you to format a text input field.
// <input type="text" ng-model="test" format="number" />
// <input type="text" ng-model="test" format="currency" />
.directive( "format", ["$filter", function ( $filter )
{
	return {
		require: "?ngModel",
		link: function ( scope, elem, attrs, ctrl )
		{
			if ( !ctrl ) return;

			ctrl.$formatters.unshift( function ( a )
			{
				return $filter( attrs.format )( ctrl.$modelValue );
			} );

			elem.bind( "blur", function ( event )
			{
				var plainNumber = elem.val().replace( /[^\d|\-+|\.+]/g, "" );
				elem.val( $filter( attrs.format )( plainNumber ) );
			} );
		}
	};
}] )
;