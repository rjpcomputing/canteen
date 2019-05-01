let apiRouter = require( "./routes" );

module.exports = function( app ) {
	/* GET home page. */
	// app.get( "/", function ( req, res, next )
	// {
	// 	//Path to your main file
	// 	res.status( 200 ).sendFile( path.join( __dirname + "../public/index.html" ) );
	// } );

	// apply the routes to our application with the prefix /api
	app.use( "/api", apiRouter );
};	
