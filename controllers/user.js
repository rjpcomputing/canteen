//const _ = require( "lodash" );
// const async = require( "async" );
const config = require( "../config" );
const UserModel = require( "../models" ).User;

exports.Get = ( req, res ) =>
{
	UserModel.Get( req.params.id )
	.then( user => res.send( user ) )
	.catch( err =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error requesting user by id", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetByEmail = ( req, res ) =>
{
	UserModel.GetAllByEmail( req.params.email )
	.then( user => res.send( user ) )
	.catch( err =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error requesting user by email", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};
