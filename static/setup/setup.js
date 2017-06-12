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
	console.log( "[EventCtrl]" );
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

	let GetAllEvents = ( order ) => Event.query( {}, ( data, headers ) => $scope.events = data ).$promise;

	$scope.GotoEventDetails = ( eventId ) => $state.go( "event", { id: eventId } );

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
} ] );