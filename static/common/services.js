var canteenService = angular.module( "Canteen.Services", ["ngResource"] );

canteenService.factory( "Event", ["$resource", function( $resource )
{
	return $resource( "api/event/:id/:cmd/:opt", {},
	{
		customers: { method: "GET", params: { cmd: "customers" }, isArray: true },
		addcustomer: { method: "POST", params: { cmd: "customer" }, isArray: false, transformRequest: [], headers: { "Content-Type": undefined } },
		post: { method: "POST", isArray: false, transformRequest: [], headers: { "Content-Type": undefined } },
		update: { method: "POST", params: { cmd: "update" }, isArray: false, transformRequest: [], headers: { "Content-Type": undefined } }
	} );
} ]);

canteenService.factory( "Customer", ["$resource", function( $resource )
{
	return $resource( "api/customer/:id/:cmd", {},
	{
		post: { method:"POST", isArray: false, transformRequest: [], headers: { "Content-Type": undefined } },
		update: { method:"POST", params: { cmd: "update" }, isArray: false, transformRequest: [], headers: { "Content-Type": undefined } }
	} );
} ]);
