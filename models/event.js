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
		return db.any( "SELECT * FROM event" );
	};

	EventModel.New = function ( release )
	{
		console.log( "[EventModel.New]" );
	};

	return EventModel;
};
