// let async = require( "async" );

module.exports = function ( db )
{
	let ProductModel = {};

	ProductModel.Get = function( productId )
	{
		return db.one( "SELECT * FROM product WHERE id = $1", productId );
	};

	ProductModel.GetByName = function( name )
	{
		return db.one( "SELECT * FROM product WHERE name = $1", name );
	};

	ProductModel.GetAll = function()
	{
		return db.any( "SELECT * FROM product ORDER BY name ASC" );
	};

	ProductModel.GetAllProductTypes = function()
	{
		return db.any( "SELECT * FROM product_type ORDER BY type ASC" );
	};

	ProductModel.GetAllByName = function( name )
	{
		return db.any( "SELECT * FROM product WHERE name ILIKE $1", "%" + name + "%" );
	};

	ProductModel.Create = function( product )
	{
		return db.one( "INSERT INTO product ( name, price, stock ) VALUES( $(name), $(price), $(stock) ) RETURNING id", product );
	};

	ProductModel.Update = function( product )
	{
		return db.none( "UPDATE product SET name = $(name), price = $(price), stock = $(stock) WHERE id = $(id)", product );
	};

	ProductModel.UpdatePrice = function( product )
	{
		return db.none( "UPDATE product SET price = $(price) WHERE id = $(id)", product );
	};

	ProductModel.UpdateStock = function( product )
	{
		return db.none( "UPDATE product SET stock = $(stock) WHERE id = $(id)", product );
	};

	ProductModel.Delete = function( id )
	{
		return db.none( "DELETE FROM product WHERE id = $1", id );
	};

	return ProductModel;
};
