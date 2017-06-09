let config = require( "../config" );
let pgp = require( "pg-promise" )();
let db = pgp( config.database );

module.exports =
{
	User: require( "./user" )( db ),
};
