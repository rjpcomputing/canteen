angular.module( "Canteen.Setup", ["ui.bootstrap"] )


.controller( "SetupCtrl", [ "$scope",
function( $scope )
{
	console.log( "[SetupCtrl]" );
	
} ])

.controller( "EventsCtrl", [ "$scope",
function( $scope )
{
	let date = new Date();
	
	$scope.events =
	[
		{ id: 1, name: "Elementry Girls Week 1", start_date: date.setDate(date.getDate()-10), end_date: date.setDate(date.getDate()+10) },
		{ id: 2, name: "Elementry Boys Week 1", start_date: date.setDate(new Date().getDate()-20), end_date: date.setDate(new Date().getDate()+20) },
		{ id: 3, name: "Middle School Girls Week 1", start_date: date.setDate(new Date().getDate()-30), end_date: new Date().setDate(date.getDate()+30) },
		{ id: 4, name: "Middle School Boys Week 1", start_date: date.setDate(new Date().getDate()-40), end_date: new Date().setDate(date.getDate()+40) },
	];
} ] )