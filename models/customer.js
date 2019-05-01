// let async = require( "async" );

module.exports = function( db ) {
	let CustomerModel = {};

	CustomerModel.Get = function( customerId ) {
		return db.one( "SELECT * FROM customer WHERE id = $1", customerId );
	};

	CustomerModel.GetByName = function( name ) {
		return db.one( "SELECT * FROM customer WHERE name = $1", name );
	};

	CustomerModel.GetAll = function() {
		return db.any( "SELECT * FROM customer ORDER BY name ASC" );
	};

	CustomerModel.GetAllCustomerTypes = function() {
		return db.any( "SELECT * FROM customer_type ORDER BY type ASC" );
	};

	CustomerModel.GetAllByName = function( name ) {
		return db.any( "SELECT * FROM customer WHERE name ILIKE $1", "%" + name + "%" );
	};

	CustomerModel.Create = function( customer ) {
		return db.one( "INSERT INTO customer ( name, starting_balance, balance ) VALUES( $(name), $(starting_balance), $(balance) ) RETURNING id", customer );
	};

	CustomerModel.Update = function( customer ) {
		return db.one( "UPDATE customer SET name = $(name), starting_balance = $(starting_balance), balance = $(balance) WHERE id = $(id) RETURNING id", customer );
	};

	CustomerModel.UpdateStartingBalance = function( customer ) {
		return db.none( "UPDATE customer SET starting_balance = $(starting_balance) WHERE id = $(id)", customer );
	};

	CustomerModel.UpdateBalance = function( customer ) {
		return db.none( "UPDATE customer SET balance = $(balance) WHERE id = $(id)", customer );
	};

	CustomerModel.Delete = function( id ) {
		return db.none( "DELETE FROM customer WHERE id = $1", id );
	};

	return CustomerModel;
};
