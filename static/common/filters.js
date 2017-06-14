angular.module( "CanteenApp" )
	.filter( "number_fixed_len", [ "$filter", function( $filter )
	{
        return function ( n, len )
		{
            var num = parseInt( n, 10 );
            len = parseInt( len, 10 );
            if ( isNaN( num ) || isNaN( len ) )
			{
                return n;
            }
            num = "" + num;
            while ( num.length < len )
			{
                num = "0" + num;
            }
            return num;
        };
    } ] )
	.filter( "asyncFilter", [ "$filter", function( $filter )
	{
		return function( array, expression, comparator )
		{
			if( array && angular.isArray( array ) )
			{
				return $filter( "filter" )( array, expression, comparator );
			}
			else
			{
				return [];
			}
		};
	} ] )
	.filter( "asyncOrderBy", [ "$filter", function( $filter )
	{
		return function( array, expression, comparator )
		{
			if( array && angular.isArray( array ) )
			{
				return $filter( "orderBy" )( array, expression, comparator );
			}
			else
			{
				return [];
			}
		};
	} ] )
;
