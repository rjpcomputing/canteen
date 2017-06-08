angular.module( "Canteen.Setup", ["ui.bootstrap"] )


.controller( "SetupCtrl", [ "$scope",
function( $scope )
{
	console.log( "[SetupCtrl]" );
	
} ])

.controller( "EventsCtrl", [ "$scope",
function( $scope )
{
	$scope.events =
	[
		{ id: 1, name: "Elementry Girls Week 1", start_date: new Date(), end_date: new Date() },
		{ id: 2, name: "Elementry Boys Week 1", start_date: new Date(), end_date: new Date() },
		{ id: 3, name: "Middle School Girls Week 1", start_date: new Date(), end_date: new Date() },
		{ id: 4, name: "Middle School Boys Week 1", start_date: new Date(), end_date: new Date() },
	];
} ] )