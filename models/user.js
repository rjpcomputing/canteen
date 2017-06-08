// let async = require( "async" );

module.exports = function ( db )
{
	let UsersModel = {};

	UsersModel.Get = function( userId )
	{
		return db.one( "SELECT * FROM users WHERE id = $1", userId );
	};

	UsersModel.GetByEmail = function( email )
	{
		return db.one( "SELECT * FROM users WHERE email = $1", email );
	};

	UsersModel.GetAll = function()
	{
		return db.any( "SELECT * FROM users" );
	};

	UsersModel.New = function ( release, cb )
	{
		console.log( "[UsersModel.New]" );
	};

	return UsersModel;
};
