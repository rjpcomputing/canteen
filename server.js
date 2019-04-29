const firebase = require( "firebase" );
const express = require( "express" );
const bodyParser = require( "body-parser" );
const morgan = require( "morgan" );
const config = require( "./config" );

firebase.initializeApp( config.firebase );

const app = express();

app.use( express.static( __dirname + "/static" ) );		// set the static files location /static/img will be /img for users
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( morgan( "dev" ) );		// use morgan to log requests to the console

require( "./routes" )( app );

// catch 404 and forward to error handler
app.use( function( req, res, next ) {
	let err = new Error( "Not Found" );
	err.status = 404;

	next( err );
} );

// error handler
app.use( function( err, req, res, _next ) {
	console.log( "err", err );
	console.log( "err.message", err.message );
	console.log( "err.status", err.status );

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get( "env" ) === "development" ? err : {};

	// render the error page
	res.status( err.status || 500 );
	// res.render( "error" );
	let errorStucture = { success: false, message: err.message, error: res.locals.error };
	res.send( errorStucture );
} );

var server = app.listen( config.server.port, function() {
	console.log( "Listening on port %s...", server.address().port );
} );
