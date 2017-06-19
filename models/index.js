let config = require( "../config" );
let pgp = require( "pg-promise" )();
let db = pgp( config.database );

module.exports =
{
	Customer: require( "./customer" )( db ),
	Event: require( "./event" )( db ),
	Product: require( "./product" )( db ),
	Purchase: require( "./purchase" )( db ),
	SaleItem: require( "./saleitem" )( db ),
};
