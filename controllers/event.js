//const _ = require( "lodash" );
// const async = require( "async" );
const config = require( "../config" );
const EventModel = require( "../models" ).Event;

exports.Get = ( req, res ) =>
{
	EventModel.Get( req.params.id )
	.then( event => res.send( event ) )
	.catch( err =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error requesting event by id", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetByDescription = ( req, res ) =>
{
	EventModel.GetAllByDescription( req.params.description )
	.then( event => res.send( event ) )
	.catch( err =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error requesting event by description", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetAll = ( req, res ) =>
{
	EventModel.GetAll()
	.then( ( events ) => res.send( events ) )
	.catch( err =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error requesting all events", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.New = ( req, res ) =>
{
	EventModel.Create( req.body )
	.then( () => res.send( { success: true, message: "Event created" } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error creating event", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.Update = ( req, res ) =>
{
	EventModel.Update( req.body )
	.then( () => res.send( { success: true, message: "Event updated" } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error updating event", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.Delete = ( req, res ) =>
{
	EventModel.Delete( req.params.id )
	.then( ( data ) =>
	{
		res.send( { success: true, message: "Event updated" } );
	} )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error updating event", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};
