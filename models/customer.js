// let async = require( "async" );

module.exports = function ( db )
{
	let CustomerModel = {};

	CustomerModel.Get = function( customerId )
	{
		return db.one( "SELECT * FROM customer WHERE id = $1", customerId );
	};

	CustomerModel.GetByName = function( name )
	{
		return db.one( "SELECT * FROM customer WHERE name = $1", name );
	};

	CustomerModel.GetAll = function()
	{
		return db.any( "SELECT * FROM customer" );
	};

	CustomerModel.New = function ( release )
	{
		console.log( "[CustomerModel.New]" );
	};

	return CustomerModel;
};
