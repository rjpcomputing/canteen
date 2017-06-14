angular.module( "Canteen.Setup", ["ui.bootstrap", "Canteen.Services"] )

.controller( "SetupCtrl", [ "$scope",
function( $scope )
{
	console.log( "[SetupCtrl]" );
} ])

.controller( "EventCtrl", [ "$scope", "$stateParams", "Event",
function( $scope, $stateParams, Event )
{
	$scope.loading = true;
	let GetEvent = ( eventId ) => Event.get( { id: eventId }, ( data, headers ) => $scope.event = data ).$promise;
	
	GetEvent( $stateParams.id )
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

	$scope.AddEvent = () => Event.save( { description: $scope.eventName, start_date: $scope.eventStartDate, end_date: $scope.eventEndDate }, ( eventId ) => GetAllEvents() );

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
		console.log( errorDetails.data || errorDetails );
	} );
} ] )

.controller( "CustomersCtrl", [ "$scope", "$state", "Customer",
function( $scope, $state, Customer )
{
	$scope.loading = true;
	// $scope.editing = false;
	$scope.isAddCustomerFormCollapsed = true;

	let GetAllCustomers = ( order ) => Customer.query( {}, ( data, headers ) => $scope.customers = data ).$promise;
	
	$scope.StartEditing = ( customer ) =>
	{
		customer.editing = true;
		customer.new_starting_balance = customer.starting_balance;
		customer.new_balance = customer.balance;
	};

	$scope.EditCustomer = ( customer ) =>
	{
		Customer.get( { id: customer.id }, ( c ) =>
		{
			c.starting_balance = customer.new_starting_balance;
			c.balance = customer.new_balance;
			c.$save( { id: c.id }, () => GetAllCustomers() );
		} ).$promise
		.then( () => customer.editing = false )
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

	$scope.CancelEditing = ( customer ) =>
	{
		customer.editing = false;
		$scope.newCustomerStartingBalance = customer.starting_balance;
		$scope.newCustomerBalance = customer.balance;
	};

	$scope.AddCustomer = () =>
	{
		Customer.save( { name: $scope.customerName, starting_balance: $scope.customerStartingBalance, balance: $scope.customerStartingBalance },
			( customerId ) => GetAllCustomers() );
	};

	$scope.DeleteCustomer = ( customer ) => Customer.get( { id: customer.id }, ( c ) => c.$delete( { id: c.id }, () => GetAllCustomers() ) );

	GetAllCustomers()
	.then( () => $scope.loading = false );
	
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