angular.module( "Canteen.Event", ["Canteen.Services"] )

.controller( "EventCtrl", [ "$scope", "$stateParams", "Event", "Customer", "UI",
function( $scope, $stateParams, Event, Customer, UI )
{
	$scope.loading = true;
	$scope.isAddCustomerFormCollapsed = true;
	$scope.customerToAdd = undefined;
	$scope.selectedCustomerType = undefined;

	let GetEvent = ( eventId ) => Event.get( { id: eventId }, ( data, headers ) => $scope.event = data ).$promise;
	let GetEventsCustomers = ( eventId ) => Event.customers( { id: eventId }, {}, ( data, headers ) => $scope.customers = data.customer ).$promise;
	$scope.GetEventsCustomers = GetEventsCustomers;
	$scope.IsObject = ( obj ) => angular.isObject( obj );

	let GetCustomerTypes = () => UI.customertypes( ( data, headers ) =>
	{
		$scope.customerTypes = data.customer_type;
		$scope.selectedCustomerType = $scope.customerTypes[0];
	} ).$promise;
	
	$scope.GetCustomersByName = ( name ) =>
	{
		return Customer.byname( { cmd: name } ).$promise
		.then( ( data, headers ) => data.customer );
	};
	
	$scope.AddCustomer = ( customer ) =>
	{
		Event.addcustomer( { id: $stateParams.id, opt: customer.id }, { type_id: $scope.selectedCustomerType.id, type: $scope.selectedCustomerType.type }, ( data, headers ) =>
		{
			$scope.customerToAdd = undefined;
			$scope.selectedCustomerType = $scope.customerTypes[0];
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
	.then( GetCustomerTypes )
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