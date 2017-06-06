const express = require( "express" );
const apiRouter = express.Router();
const config = require( "../config" );
const UsersController = require( "../controllers/user" );

apiRouter.get( "/user/:id", function( req, res )
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

apiRouter.post( "/user/login",  UsersController.Login );

module.exports = apiRouter;
