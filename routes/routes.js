const express = require( "express" );
const apiRouter = express.Router();
const config = require( "../config" );
const CustomerController = require( "../controllers/customer" );
const EventController = require( "../controllers/event" );

apiRouter.get( "/customer",  CustomerController.GetAll );
apiRouter.get( "/customer/:id",  CustomerController.Get );
apiRouter.post( "/customer",  CustomerController.New );
apiRouter.post( "/customer/:id",  CustomerController.Update );
apiRouter.delete( "/customer/:id",  CustomerController.Delete );
apiRouter.get( "/event",  EventController.GetAll );
apiRouter.get( "/event/:id",  EventController.Get );
apiRouter.post( "/event",  EventController.New );
apiRouter.post( "/event/:id",  EventController.Update );
apiRouter.delete( "/event/:id",  EventController.Delete );

// -- 

module.exports = apiRouter;
