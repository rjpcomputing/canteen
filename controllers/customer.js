//const _ = require( "lodash" );
// const async = require( "async" );
const config = require( "../config" );
const CustomerModel = require( "../models" ).Customer;
const PurchaseModel = require( "../models" ).Purchase;
const SaleItemModel = require( "../models" ).SaleItem;

exports.Get = ( req, res ) =>
{
	CustomerModel.Get( req.params.id )
	.then( ( customer ) => res.send( { success: true, message: "Customer " + req.params.id + " details", customer: customer } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting customer by id", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetByName = ( req, res ) =>
{
	CustomerModel.GetByName( req.params.name )
	.then( ( customer ) => res.send( { success: true, message: "Customer with name '" + req.params.name + "'", customer: customer } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting customer by name", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetAll = ( req, res ) =>
{
	CustomerModel.GetAll()
	.then( ( customers ) => res.send( { success: true, message: "All customers", customer: customers } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting all customers", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetAllByName = ( req, res ) =>
{
	CustomerModel.GetAllByName( req.params.name )
	.then( ( customers ) => res.send( { success: true, message: "Customers with '" + req.params.name + "'", customer: customers } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting customers by name", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetPurchases = ( req, res ) =>
{
	PurchaseModel.GetByCustomer( req.params.id )
	// .then( ( purchases ) =>
	// {
	// 	for( let purchase in purchases ) {
	// 		SaleItemModel.GetByPurchase( purchase.id )
	// 		.then( ( saleItems ) => purchase.sale_item = saleItems );
	// 	}

	// 	return purchases;
	// } )
	.then( ( purchases ) => res.send( { success: true, message: "Customer " + req.params.id + " purchases", purchase: purchases } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting purchases for customer by id", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.New = ( req, res ) =>
{
	CustomerModel.Create( req.body )
	.then( () => res.send( { success: true, message: "Customer created" } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error creating customer", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.AddPurchase = ( req, res ) =>
{
	PurchaseModel.Create( req.params.id, req.body.amount )
	.then( ( newPurchase ) =>
	{
		for( let item in req.body.purchase )
		{
			SaleItemModel.Create( newPurchase.id, item.id )
		}
	} )
	.then( () => CustomerModel.Get( req.params.id ) )
	.then( ( cust ) =>
	{
		cust.balance -= req.body.amount;
		CustomerModel.Update( cust );
	} )
	.then( () => res.send( { success: true, message: "Purchase added" } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error creating purchase", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.Update = ( req, res ) =>
{
	CustomerModel.Update( req.body )
	.then( () => res.send( { success: true, message: "Customer updated" } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error updating customer", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.Delete = ( req, res ) =>
{
	CustomerModel.Delete( req.params.id )
	.then( ( data ) =>
	{
		res.send( { success: true, message: "Customer deleted" } );
	} )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error deleting customer", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};
