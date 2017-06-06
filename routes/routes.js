const express = require( "express" );
const apiRouter = express.Router();
const config = require( "../config" );
const UsersController = require( "../controllers/user" );

var appRouter = function( app )
{
	//app.get( "/", function( req, res )
	//{
		//res.send("Hello World");
	//} );

	app.get( "/api/user/:id", function( req, res )
	{
		var accountMock =
		{
			"username": "peter.griffin",
			"password": "1234",
			"email": "peter.griffin@gmail.com"
		};

		if( !req.query.username )
		{
			return res.send( { "status": "error", "message": "missing username" } );
		}
		else if ( req.query.username != accountMock.username )
		{
			return res.send( { "status": "error", "message": "wrong username" } );
		}
		else
		{
			return res.send( accountMock );
		}
	} );

	app.post( "/api/user/login",  UsersController.Login );

	// Angular.js Application -------------------------------------------------
    app.get( "*", function( req, res )
	{
        res.sendFile( "index.html", { root: __dirname + "/static" } ); // load the single view file (angular will handle the page changes on the front-end)
    } );
};

module.exports = appRouter;
