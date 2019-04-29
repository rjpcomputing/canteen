// let async = require( "async" );

module.exports = function( db ) {
	let SaleItemModel = {};
	
	SaleItemModel.GetByPurchase = function( purchaseId ) {
		return db.any( "SELECT sale_item.id AS id, sale_item.created_at AS created_at, sale_item.updated_at AS updated_at, purchase_id, product_id, name, description, price, sold_price, stock FROM sale_item, product WHERE purchase_id = $1 AND sale_item.product_id = product.id", purchaseId );
	};

	SaleItemModel.GetItemsForPurchases = function( customerPurchases ) {
		return db.tx( ( t ) => {
			let queries = [];
			customerPurchases.forEach( ( purchase ) => queries.push( SaleItemModel.GetByPurchase( purchase.id ) ) );

			return t.batch( queries );
		} );
	};

	SaleItemModel.Create = function( purchaseId, productId, soldPrice ) {
		return db.one( "INSERT INTO sale_item ( purchase_id, product_id, sold_price ) VALUES( $1, $2, $3 ) RETURNING id", [purchaseId, productId, soldPrice] );
	};

	return SaleItemModel;
};
