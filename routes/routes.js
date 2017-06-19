const express = require( "express" );
const apiRouter = express.Router();
const config = require( "../config" );
const CustomerController = require( "../controllers/customer" );
const EventController = require( "../controllers/event" );
const ProductController = require( "../controllers/product" );

// Customer
apiRouter.get( "/customer",  CustomerController.GetAll );
apiRouter.get( "/customer/:id",  CustomerController.Get );
apiRouter.get( "/customer/byname/:name",  CustomerController.GetAllByName );
apiRouter.get( "/customer/:id/purchase",  CustomerController.GetPurchases );
apiRouter.post( "/customer",  CustomerController.New );
apiRouter.post( "/customer/:id",  CustomerController.Update );
apiRouter.post( "/customer/:id/purchase",  CustomerController.AddPurchase );
apiRouter.delete( "/customer/:id",  CustomerController.Delete );
// Event
apiRouter.get( "/event",  EventController.GetAll );
apiRouter.get( "/event/:id",  EventController.Get );
apiRouter.get( "/event/:id/customer",  EventController.GetCustomers );
apiRouter.post( "/event",  EventController.New );
apiRouter.post( "/event/:id",  EventController.Update );
apiRouter.delete( "/event/:id",  EventController.Delete );
apiRouter.post( "/event/:id/customer/:customerid",  EventController.AddCustomer );
apiRouter.delete( "/event/:id/customer/:customerid",  EventController.DeleteCustomer );
// Product
apiRouter.get( "/product",  ProductController.GetAll );
apiRouter.get( "/product/:id",  ProductController.Get );
apiRouter.post( "/product",  ProductController.New );
apiRouter.post( "/product/:id",  ProductController.Update );
apiRouter.delete( "/product/:id",  ProductController.Delete );

module.exports = apiRouter;
