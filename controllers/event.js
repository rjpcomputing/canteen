//const config = require( "../config" );
const EventModel = require( "../models" ).Event;

exports.Get = ( req, res ) => {
	EventModel.Get( req.params.id )
		.then( ( event ) => res.send( event ) )
		.catch( err => {
			console.error( err );
			return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting event by id", error: req.app.get( "env" ) === "development" ? err : {} } );
		} );
};

exports.GetCustomers = ( req, res ) => {
	EventModel.GetCustomers( req.params.id )
		.then( ( customers ) => res.send( { success: true, message: "Customers in event", customer: customers } ) )
		.catch( err => {
			console.error( err );
			return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting customers for event", error: req.app.get( "env" ) === "development" ? err : {} } );
		} );
};

exports.GetByDescription = ( req, res ) => {
	EventModel.GetByDescription( req.params.description )
		.then( ( event ) => res.send( event ) )
		.catch( err => {
			console.error( err );
			return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting event by description", error: req.app.get( "env" ) === "development" ? err : {} } );
		} );
};

exports.GetAll = ( req, res ) => {
	EventModel.GetAll( req.query.year )
		.then( ( events ) => res.send( events ) )
		.catch( err => {
			console.error( err );
			return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting all events", error: req.app.get( "env" ) === "development" ? err : {} } );
		} );
};

exports.GetAvailableYears = ( req, res ) => {
	EventModel.GetDistinctYears()
		.then( ( years ) => res.send( { success: true, message: "Distinct years", years: years } ) )
		.catch( err => {
			console.error( err );
			return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting customers for event", error: req.app.get( "env" ) === "development" ? err : {} } );
		} );
};

exports.New = ( req, res ) => {
	EventModel.Create( req.body )
		.then( () => res.send( { success: true, message: "Event created" } ) )
		.catch( ( err ) => {
			console.error( err );
			return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error creating event", error: req.app.get( "env" ) === "development" ? err : {} } );
		} );
};

exports.AddCustomer = ( req, res ) => {
	EventModel.AddCustomer( req.params.id, req.params.customerid, req.body.type_id )
		.then( () => res.send( { success: true, message: "Customer added to event" } ) )
		.catch( ( err ) => {
			console.error( err );
			return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error adding customer to event", error: req.app.get( "env" ) === "development" ? err : {} } );
		} );
};

exports.UpdateCustomer = ( req, res ) => {
	let eventCustomer = { event_id: req.params.id, customer_id: req.params.customerid, type_id: req.body.type_id };
	EventModel.UpdateCustomer( eventCustomer )
		.then( () => res.send( { success: true, message: "Customer updated in event '" + req.params.id + "'" } ) )
		.catch( ( err ) => {
			console.error( err );
			return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error updating customer in event", error: req.app.get( "env" ) === "development" ? err : {} } );
		} );
};

exports.DeleteCustomer = ( req, res ) => {
	EventModel.DeleteCustomer( req.params.id, req.params.customerid )
		.then( () => res.send( { success: true, message: "Customer removed from event" } ) )
		.catch( ( err ) => {
			console.error( err );
			return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error removing customer from event", error: req.app.get( "env" ) === "development" ? err : {} } );
		} );
};

exports.Update = ( req, res ) => {
	EventModel.Update( req.body )
		.then( () => res.send( { success: true, message: "Event updated" } ) )
		.catch( ( err ) => {
			console.error( err );
			return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error updating event", error: req.app.get( "env" ) === "development" ? err : {} } );
		} );
};

exports.Delete = ( req, res ) => {
	EventModel.Delete( req.params.id )
		.then( ( _data ) => {
			res.send( { success: true, message: "Event updated" } );
		} )
		.catch( ( err ) => {
			console.error( err );
			return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error updating event", error: req.app.get( "env" ) === "development" ? err : {} } );
		} );
};
