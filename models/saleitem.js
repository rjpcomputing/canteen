// let async = require( "async" );

module.exports = function ( db )
{
	let SaleItemModel = {};
	
	SaleItemModel.GetByPurchase = function( purchaseId )
	{
		return db.one( "SELECT sale_item.id AS id, sale_item.created_at AS created_at, sale_item.updated_at AS updated_at, purchase_id, product_id, name, description, price, stock FROM sale_item, product WHERE purchase_id = $1 AND sale_item.product_id = product.id", purchaseId );
	};

	SaleItemModel.Create = function( purchaseId, productId )
	{
		return db.one( "INSERT INTO sale_item ( purchase_id, product_id ) VALUES( $1, $2 ) RETURNING id", [purchaseId, productId] );
	};

	return SaleItemModel;
};