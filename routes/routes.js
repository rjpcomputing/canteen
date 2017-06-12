const express = require( "express" );
const apiRouter = express.Router();
const config = require( "../config" );
const CustomerController = require( "../controllers/customer" );
const EventController = require( "../controllers/event" );

apiRouter.get( "/customer",  CustomerController.GetAll );
apiRouter.get( "/customer/:id",  CustomerController.Get );
apiRouter.get( "/event",  EventController.GetAll );
apiRouter.get( "/event/:id",  EventController.Get );

// -- 

module.exports = apiRouter;
