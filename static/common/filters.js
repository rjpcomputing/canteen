angular.module( "CanteenApp" )
	.filter( "number_fixed_len", ["$filter", function( $filter ) {
		return function( n, len ) {
			var num = parseInt( n, 10 );
			len = parseInt( len, 10 );
			if ( isNaN( num ) || isNaN( len ) ) {
				return n;
			}
			num = "" + num;
			while ( num.length < len ) {
				num = "0" + num;
			}
			return num;
		};
	}] )
	.filter( "title_case", ["$filter", function( $filter ) {
		return function( str ) {
			var splitStr = str.toLowerCase().split( " " );
			for ( var i = 0; i < splitStr.length; i++ ) {
				// You do not need to check if i is larger than splitStr length, as your for does that for you
				// Assign it back to the array
				splitStr[i] = splitStr[i].charAt( 0 ).toUpperCase() + splitStr[i].substring( 1 );
			}
			// Directly return the joined string
			return splitStr.join( ' ' );
		}
	}] )
	.filter( "asyncFilter", ["$filter", function( $filter ) {
		return function( array, expression, comparator ) {
			if ( array && angular.isArray( array ) ) {
				return $filter( "filter" )( array, expression, comparator );
			}
			else {
				return [];
			}
		};
	}] )
	.filter( "asyncOrderBy", ["$filter", function( $filter ) {
		return function( array, expression, comparator ) {
			if ( array && angular.isArray( array ) ) {
				return $filter( "orderBy" )( array, expression, comparator );
			}
			else {
				return [];
			}
		};
	}] )
	;
