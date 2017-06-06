var canteenService = angular.module( "Canteen.Services", ["ngResource"] );

canteenService.factory( "Users", ["$resource", function( $resource )
{
	return $resource( "api/user/:id/:cmd", {},
	{
		post: { method:"POST", isArray:false, transformRequest: [], headers: {'Content-Type': undefined } },
		login: { method:"POST", params: { cmd: "login" }, isArray:false, transformRequest: [], headers: {'Content-Type': undefined } },
		update: { method:"POST", params: { cmd: "update" }, isArray:false, transformRequest: [], headers: {'Content-Type': undefined } }
	} );
} ]);
