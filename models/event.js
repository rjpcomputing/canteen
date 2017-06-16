// let async = require( "async" );

module.exports = function ( db )
{
	let EventModel = {};

	EventModel.Get = function( eventId )
	{
		return db.one( "SELECT * FROM event WHERE id = $1", eventId );
	};

	EventModel.GetCustomers = function( eventId )
	{
		let query =
		`SELECT customer.id as id, customer.created_at as created_at, customer.updated_at as updated_at, customer.name as name, customer.starting_balance as starting_balance, customer.balance as balance
		FROM event_customer, customer
		WHERE event_customer.event_id = $1 AND event_customer.customer_id = customer.id
		ORDER BY name ASC`;
		
		return db.any( query, eventId );
	};

	EventModel.GetByDescription = function( description )
	{
		return db.one( "SELECT * FROM event WHERE description = $1", description );
	};

	EventModel.GetAll = function()
	{
		return db.any( "SELECT * FROM event ORDER BY start_date ASC" );
	};

	EventModel.Create = function( event )
	{
		return db.one( "INSERT INTO event ( description, start_date, end_date ) VALUES( $(description), $(start_date), $(end_date) ) RETURNING id", event );
	};

	EventModel.AddCustomer = function( eventId, customerId )
	{
		return db.one( "INSERT INTO event_customer ( event_id, customer_id ) VALUES( $1, $2 ) RETURNING id", [ eventId, customerId ] );
	};

	EventModel.DeleteCustomer = function( eventId, customerId )
	{
		return db.none( "DELETE FROM event_customer WHERE event_id = $1 AND customer_id = $2", [ eventId, customerId ] );
	};

	EventModel.Update = function( event )
	{
		return db.none( "UPDATE event SET description = $(description), start_date = $(start_date), end_date = $(end_date) WHERE id = $(id)", event );
	};

	EventModel.Delete = function( id )
	{
		return db.none( "DELETE FROM event WHERE id = $1", id );
	};

	return EventModel;
};
