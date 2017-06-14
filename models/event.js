// let async = require( "async" );

module.exports = function ( db )
{
	let EventModel = {};

	EventModel.Get = function( eventId )
	{
		return db.one( "SELECT * FROM event WHERE id = $1", eventId );
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
