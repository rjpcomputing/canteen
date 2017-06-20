//const _ = require( "lodash" );
// const async = require( "async" );
const config = require( "../config" );
const ProductModel = require( "../models" ).Product;

exports.Get = ( req, res ) =>
{
	ProductModel.Get( req.params.id )
	.then( ( product ) => res.send( { success: true, message: "Product " + req.params.id + " details", product: product } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting product by id", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetByName = ( req, res ) =>
{
	ProductModel.GetByName( req.params.name )
	.then( ( product ) => res.send( { success: true, message: "Product with name '" + req.params.name + "'", product: product } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting product by name", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetAll = ( req, res ) =>
{
	ProductModel.GetAll()
	.then( ( products ) => res.send( { success: true, message: "All products", product: products } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting all products", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetAllProductTypes = ( req, res ) =>
{
	ProductModel.GetAllProductTypes()
	.then( ( productTypes ) => res.send( { success: true, message: "All product types", product_type: productTypes } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting all product types", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.GetAllByName = ( req, res ) =>
{
	ProductModel.GetAllByName( req.params.name )
	.then( ( products ) => res.send( { success: true, message: "Products with name '" + req.params.name + "'", product: products } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error requesting products by name", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.New = ( req, res ) =>
{
	ProductModel.Create( req.body )
	.then( () => res.send( { success: true, message: "Product created" } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error creating product", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.Update = ( req, res ) =>
{
	ProductModel.Update( req.body )
	.then( () => res.send( { success: true, message: "Product updated" } ) )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error updating product", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};

exports.Delete = ( req, res ) =>
{
	ProductModel.Delete( req.params.id )
	.then( ( data ) =>
	{
		res.send( { success: true, message: "Product deleted" } );
	} )
	.catch( ( err ) =>
	{
		console.error( err );
		return res.status( 500 ).send( { success: false, url: req.originalUrl, message: err.message, userMessage: "Error deleting product", error: req.app.get( "env" ) === "development" ? err : {} } );
	} );
};
