//const _ = require( "lodash" );
// const async = require( "async" );
const bcrypt = require( "bcrypt" );
const config = require( "../config" );
const UserModel = require( "../models" ).User;

exports.Login = ( req, res ) =>
{
	const email = req.body.email;
	const password = req.body.password;
	if ( !email ) return res.status( 400 ).send( { success: false, message: "You must enter an email address." } );
	if ( !password ) return res.status( 400 ).send( { success: false, message: "You must enter a password." } );

	bcrypt.hash( password, config.key.saltRounds, ( err, hash ) =>
	{
		console.log( "[HASH]", hash );
	});
	
	UserModel.GetByEmail( email )
	.then( user =>
	{
		bcrypt.compare( password, user.password )
		.then( userAuthenticated =>
		{
			if ( userAuthenticated )
			{
				let payload = { id: user.id, email: user.email };

				// return the information including token as JSON
				return res.send( { success: true, message: "User login successful." } );
			}
			else
			{
				return res.status( 500 ).send( { success: false, message: "Authentication failed. Wrong email or password." } );
			}
		} );
	} )
	.catch( err =>
	{
		let errorPayload =
		{
			success: false,
			message: "Authentication failed. User not found.",
			error: req.app.get( "env" ) === "development" ? err : {}
		}; 
		
		return res.status( 500 ).send( errorPayload );
	} );
};

exports.New = ( req, res ) =>
{
	ServicesModel.GetAllByUsername( req.params.email, ( err, services ) =>
	{
		if ( err )
		{
			console.error( err );

			return res.status( 500 ).send( { code: 500, method: req.method, developerMessage: err.message, url: req.baseUrl, userMessage: "Error requesting services by username", data: err } );
		}
		else
		{
			return res.send( services );
		}
	} );
};
