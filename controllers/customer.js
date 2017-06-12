//const _ = require( "lodash" );
// const async = require( "async" );
const config = require( "../config" );
const CustomerModel = require( "../models" ).Customer;

exports.Get = ( req, res ) =>
{
	CustomerModel.Get( req.params.id )
	.then( customer => res.send( customer ) )
	.catch( err =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error requesting customer by id", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetByName = ( req, res ) =>
{
	CustomerModel.GetAllByName( req.params.email )
	.then( customer => res.send( customer ) )
	.catch( err =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error requesting user by name", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetAll = ( req, res ) =>
{
	CustomerModel.GetAll()
	.then( customers => res.send( customers ) )
	.catch( err =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error requesting all customers", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};
