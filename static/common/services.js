var canteenService = angular.module( "Canteen.Services", ["ngResource"] );

canteenService.factory( "Event", ["$resource", function( $resource )
{
	return $resource( "api/event/:id/:cmd/:opt/:verb", {},
	{
		customers: { method: "GET", params: { cmd: "customer" }, isArray: false },
		addcustomer: { method: "POST", params: { cmd: "customer" }, isArray: false },
		updatecustomer: { method: "POST", params: { cmd: "customer", verb: "update" }, isArray: false },
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
		purchases: { method: "GET", params: { cmd: "purchase" }, isArray: false },
		addpurchase: { method:"POST", params: { cmd: "purchase" }, isArray: false },
		post: { method:"POST", params: { cmd: "purchase" }, isArray: false, transformRequest: [], headers: { "Content-Type": undefined } },
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

canteenService.factory( "Purchase", ["$resource", function( $resource )
{
	return $resource( "api/purchase/:id/:cmd/:opt", {},
	{
		query: { method: "GET", isArray: false }
	} );
} ]);

canteenService.factory( "UI", ["$resource", function( $resource )
{
	return $resource( "api/ui/:id/:cmd/:opt", {},
	{
		customertypes: { method: "GET", params: { id: "customertypes" }, isArray: false },
		producttypes: { method: "GET", params: { id: "producttypes" }, isArray: false },
	} );
} ]);
