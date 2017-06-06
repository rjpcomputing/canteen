let apiRouter = require( "./routes" );

module.exports = function ( app )
{
	// apply the routes to our application with the prefix /api
	app.use( "/api", apiRouter );
};	
