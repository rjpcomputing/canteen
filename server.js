var express = require( "express" );
var bodyParser = require( "body-parser" );
var app = express();

app.use( express.static( __dirname + "/static" ) );		// set the static files location /static/img will be /img for users
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

var routes = require( "./routes/routes.js" )( app );

var server = app.listen( process.env.PORT || 8080, function ()
{
    console.log( "Listening on port %s...", server.address().port );
} );
