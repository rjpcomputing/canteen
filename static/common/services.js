var canteenService = angular.module( "Canteen.Services", ["ngResource"] );

canteenService.factory( "Event", ["$resource", function( $resource )
{
	return $resource( "api/event/:id/:cmd/:opt", {},
	{
		customers: { method: "GET", params: { cmd: "customer" }, isArray: false },
		addcustomer: { method: "POST", params: { cmd: "customer" }, isArray: false },
		deletecustomer: { method: "DELETE", params: { cmd: "customer" }, isArray: false },
		post: { method: "POST", isArray: false, transformRequest: [], headers: { "Content-Type": undefined } },
		update: { method: "POST", params: { cmd: "update" }, isArray: false, transformRequest: [], headers: { "Content-Type": undefined } }
	} );
} ]);

canteenService.factory( "Customer", ["$resource", function( $resource )
{
	return $resource( "api/customer/:id/:cmd/:opt", {},
	{
		query: { method: "GET", isArray: false },
		byname: { method: "GET", params: { id: "byname" }, isArray: false },
		post: { method:"POST", isArray: false, transformRequest: [], headers: { "Content-Type": undefined } },
		update: { method:"POST", isArray: false, transformRequest: [], headers: { "Content-Type": undefined } }
	} );
} ]);

canteenService.factory( "Product", ["$resource", function( $resource )
{
	return $resource( "api/product/:id/:cmd/:opt", {},
	{
		query: { method: "GET", isArray: false }
	} );
} ]);
