angular.module( "Canteen.Directives", [] )

	// <button ng-click="save()" confirm="Save Changes?">Save</button>
	.directive( "confirm", [function() {
		return {
			priority: 100,
			restrict: "A",
			link:
			{
				pre: function( scope, element, attrs ) {
					var msg = attrs.confirm || "Are you sure?";

					element.bind( "click", function( event ) {
						if ( !confirm( msg ) ) {
							event.stopImmediatePropagation();
							event.preventDefault();
						}
					} );
				}
			}
		};
	}] )

	// allow you to format a text input field.
	// <input type="text" ng-model="test" format="number" />
	// <input type="text" ng-model="test" format="currency" />
	.directive( "format", ["$filter", function( $filter ) {
		return {
			require: "?ngModel",
			link: function( scope, elem, attrs, ctrl ) {
				if ( !ctrl ) return;

				ctrl.$formatters.unshift( function( _a ) {
					return $filter( attrs.format )( ctrl.$modelValue );
				} );

				elem.bind( "blur", function( _event ) {
					var plainNumber = elem.val().replace( /[^\d|\-+|.+]/g, "" );
					elem.val( $filter( attrs.format )( plainNumber ) );
				} );
			}
		};
	}] )

	.directive( "eventFocus", ["focus", function( focus ) {
		return function( scope, elem, attr ) {
			elem.on( attr.eventFocus, function() {
				focus( attr.eventFocusId );
			} );

			// Removes bound events in the element itself
			// when the scope is destroyed
			scope.$on( "$destroy", function() {
				elem.off( attr.eventFocus );
			} );
		};
	}] )

	.factory( "focus", ["$timeout", "$window", function( $timeout, $window ) {
		return function( id ) {
			// timeout makes sure that it is invoked after any other event has been triggered.
			// e.g. click events that need to run before the focus or
			// inputs elements that are in a disabled state but are enabled when those events
			// are triggered.
			$timeout( function() {
				var element = $window.document.getElementById( id );
				if ( element )
					element.focus();
			} );
		};
	}] )

;
