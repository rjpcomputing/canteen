//const _ = require( "lodash" );
// const async = require( "async" );
const config = require( "../config" );
const EventModel = require( "../models" ).Event;

exports.Get = ( req, res ) =>
{
	EventModel.Get( req.params.id )
	.then( ( event ) => res.send( event ) )
	.catch( err =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error requesting event by id", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetCustomers = ( req, res ) =>
{
	EventModel.GetCustomers( req.params.id )
	.then( ( customers ) => res.send( {success: true, message: "Customers in event", customers: customers } ) )
	.catch( err =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error requesting customers for event", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetByDescription = ( req, res ) =>
{
	EventModel.GetAllByDescription( req.params.description )
	.then( ( event ) => res.send( event ) )
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

exports.AddCustomer = ( req, res ) =>
{
	console.log( "[AddCustomer]", req.params );
	
	EventModel.AddCustomer( req.params.id, req.params.customerid )
	.then( () => res.send( { success: true, message: "Customer added to event" } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.baseUrl, message: err.message, userMessage: "Error adding customer to event", error: req.app.get( "env" ) === "development" ? err : {} } );
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
