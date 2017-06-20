// let async = require( "async" );

const SaleItemModel = require( "./index" ).SaleItem;

module.exports = function ( db )
{
	let PurchaseModel = {};
	
	PurchaseModel.Get = function( purchaseId )
	{
		return db.one( "SELECT * FROM purchase WHERE id = $1", purchaseId );
	};

	PurchaseModel.GetByCustomer = function( customerId )
	{
		return db.any( "SELECT * FROM purchase WHERE customer_id = $1 ORDER BY created_at DESC", customerId )
	};

	PurchaseModel.GetByCustomerToday = function( customerId )
	{
		return db.any( "SELECT * FROM purchase WHERE customer_id = $1 AND DATE( created_at ) = CURRENT_DATE", customerId );
	};

	PurchaseModel.Create = function( customerId, amount )
	{
		return db.one( "INSERT INTO purchase ( customer_id, amount ) VALUES( $1, $2 ) RETURNING id", [customerId, amount] );
	};

	return PurchaseModel;
};
