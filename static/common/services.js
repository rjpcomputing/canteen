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

canteenService.directive( "eventFocus", function ( focus )
{
	return function ( scope, elem, attr )
	{
		elem.on( attr.eventFocus, function ()
		{
			focus( attr.eventFocusId );
		} );

		// Removes bound events in the element itself
		// when the scope is destroyed
		scope.$on( "$destroy", function ()
		{
			elem.off( attr.eventFocus );
		} );
	};
} );

canteenService.factory( "focus", function ( $timeout, $window )
{
	return function ( id )
	{
		// timeout makes sure that it is invoked after any other event has been triggered.
		// e.g. click events that need to run before the focus or
		// inputs elements that are in a disabled state but are enabled when those events
		// are triggered.
		$timeout( function ()
		{
			var element = $window.document.getElementById( id );
			if ( element )
				element.focus();
		} );
	};
} );