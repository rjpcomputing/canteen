-- ----------------------------------------------------------------------------
-- Initial import script used to populate a Postgres database
-- with the minimum structure used by Canteen.
--
-- Author:	Ryan Pusztai <rjpcomputing@gmail.com>
-- Date:	06/12/2017
--
-- Notes:
--		06/12/2017 - Initial Release
-- ----------------------------------------------------------------------------

-- RESET DB -------------------------------------------------------------------
--
DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS product_type CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS customer_type CASCADE;
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS event_customer CASCADE;
DROP TABLE IF EXISTS purchase CASCADE;
DROP TABLE IF EXISTS sale_item CASCADE;
-- DROP TABLE IF EXISTS settings CASCADE;
DROP TRIGGER IF EXISTS update_event_updated_at ON event;
DROP TRIGGER IF EXISTS update_product_updated_at ON product;
DROP TRIGGER IF EXISTS update_customer_updated_at ON customer;
DROP TRIGGER IF EXISTS update_purchase_updated_at ON customer;
DROP TRIGGER IF EXISTS update_sale_item_updated_at ON customer;
-- DROP TRIGGER IF EXISTS update_settings_updated_at ON customer;

-- FUNCTIONS ------------------------------------------------------------------
--
CREATE OR REPLACE FUNCTION update_updated_at()	
RETURNS TRIGGER AS $$
BEGIN
	IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN
		NEW.updated_at = now(); 
		RETURN NEW;
	ELSE
		RETURN OLD;
	END IF;
END;
$$ language 'plpgsql';

-- TABLES ---------------------------------------------------------------------
--
CREATE TABLE event (
	id									BIGSERIAL PRIMARY KEY NOT NULL,
	created_at							TIMESTAMP DEFAULT now(),
	updated_at							TIMESTAMP DEFAULT now(),
	description							TEXT NOT NULL,
	start_date							TIMESTAMP NOT NULL,
	end_date							TIMESTAMP NOT NULL,
	CONSTRAINT unique_event 			UNIQUE ( description, start_date, end_date )
);

CREATE TABLE product_type (
	id									BIGSERIAL PRIMARY KEY NOT NULL,
	type								TEXT NOT NULL,
	CONSTRAINT unique_product_type		UNIQUE ( type )
);

CREATE TABLE product (
	id									BIGSERIAL PRIMARY KEY NOT NULL,
	created_at							TIMESTAMP DEFAULT now(),
	updated_at							TIMESTAMP DEFAULT now(),
	name								TEXT NOT NULL,
	description							TEXT DEFAULT NULL,
	cost								FLOAT NOT NULL,
	price								FLOAT NOT NULL,
	stock								INTEGER DEFAULT 0,
	type_id								BIGINT NOT NULL REFERENCES product_type(id) ON DELETE CASCADE,
	CONSTRAINT unique_product 			UNIQUE ( name, price )
);

CREATE TABLE customer_type (
	id									BIGSERIAL PRIMARY KEY NOT NULL,
	type								TEXT NOT NULL,
	CONSTRAINT unique_customer_type		UNIQUE ( type )
);

CREATE TABLE customer (
	id									BIGSERIAL PRIMARY KEY NOT NULL,
	created_at							TIMESTAMP DEFAULT now(),
	updated_at							TIMESTAMP DEFAULT now(),
	name								TEXT NOT NULL,
	starting_balance					FLOAT DEFAULT 0.0,
	balance								FLOAT DEFAULT 0.0,
	CONSTRAINT unique_customer			UNIQUE ( name )
);

CREATE TABLE event_customer (
	id									BIGSERIAL PRIMARY KEY NOT NULL,
	event_id							BIGINT NOT NULL REFERENCES event(id) ON DELETE CASCADE,
	customer_id							BIGINT NOT NULL REFERENCES customer(id) ON DELETE CASCADE,
	type_id								BIGINT NOT NULL REFERENCES customer_type(id) ON DELETE CASCADE,
	CONSTRAINT unique_event_customer	UNIQUE ( event_id, customer_id )
);

CREATE TABLE purchase (
	id									BIGSERIAL PRIMARY KEY NOT NULL,
	created_at							TIMESTAMP DEFAULT now(),
	updated_at							TIMESTAMP DEFAULT now(),
	customer_id							BIGINT NOT NULL REFERENCES customer(id) ON DELETE CASCADE,
	amount								FLOAT NOT NULL,
	CONSTRAINT unique_purchase			UNIQUE ( created_at, customer_id )
);

CREATE TABLE sale_item (
	id									BIGSERIAL PRIMARY KEY NOT NULL,
	created_at							TIMESTAMP DEFAULT now(),
	updated_at							TIMESTAMP DEFAULT now(),
	purchase_id							BIGINT NOT NULL REFERENCES purchase(id) ON DELETE CASCADE,
	product_id							BIGINT NOT NULL REFERENCES product(id) ON DELETE CASCADE,
	sold_price							FLOAT NOT NULL
);

-- CREATE TABLE settings (
-- 	id									BIGSERIAL PRIMARY KEY NOT NULL,
-- 	created_at							TIMESTAMP DEFAULT now(),
-- 	updated_at							TIMESTAMP DEFAULT now(),
-- 	key									TEXT NOT NULL,
-- 	value								TEXT NOT NULL,
-- 	CONSTRAINT unique_setting			UNIQUE ( key )
-- );

-- PERMISSIONS ----------------------------------------------------------------
--
ALTER SCHEMA public OWNER TO canteen;

ALTER TABLE event OWNER TO canteen;
ALTER TABLE product OWNER TO canteen;
ALTER TABLE product_type OWNER TO canteen;
ALTER TABLE customer OWNER TO canteen;
ALTER TABLE customer_type OWNER TO canteen;
ALTER TABLE event_customer OWNER TO canteen;
ALTER TABLE purchase OWNER TO canteen;
ALTER TABLE sale_item OWNER TO canteen;
-- ALTER TABLE settings OWNER TO canteen;

-- TRIGGERS -------------------------------------------------------------------
--
CREATE TRIGGER update_event_updated_at BEFORE UPDATE ON event FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON product FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
CREATE TRIGGER update_customer_updated_at BEFORE UPDATE ON customer FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
CREATE TRIGGER update_purchase_updated_at BEFORE UPDATE ON purchase FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
CREATE TRIGGER update_sale_item_updated_at BEFORE UPDATE ON sale_item FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
-- CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- DEFAULT DATA ---------------------------------------------------------------
--
-- INSERT INTO settings ( key, value ) VALUES
-- 	( 'canteen_discount_percent', '50' ),
-- 	( 'staff_above_cost', '0' );

INSERT INTO customer_type ( type ) VALUES
	( 'Camper' ),
	( 'Summer Staff' ),
	( 'Permanent Staff' );

INSERT INTO product_type ( type ) VALUES
	( 'Canteen' ),
	( 'Store' );

INSERT INTO event ( description, start_date, end_date ) VALUES
	( 'Day Camp I',				'2017-05-29 08:00:00',	'2017-06-02 20:00:00' ),
	( 'Teen Week',				'2017-06-05 08:00:00',	'2017-06-09 20:00:00' ),
	( 'Junior Week I',			'2017-06-12 08:00:00',	'2017-06-16 20:00:00' ),
	( 'Junior Week II',			'2017-06-19 08:00:00',	'2017-06-23 20:00:00' ),
	( 'Junior High Boys',		'2017-06-26 08:00:00',	'2017-06-30 20:00:00' ),
	( 'Junior Week III',		'2017-07-03 08:00:00',	'2017-07-07 20:00:00' ),
	( 'Junior High Girls',		'2017-07-10 08:00:00',	'2017-07-14 20:00:00' ),
	( 'Day Camp II',			'2017-07-17 08:00:00',	'2017-07-21 20:00:00' ),
	( 'Wilderness Week',		'2017-07-17 08:00:00',	'2017-07-21 20:00:00' );

INSERT INTO product ( name, description, cost, price, stock, type_id ) VALUES
	( 'Candy',				NULL,								0.75,	0.75,	NULL,	1 ),
	( 'Water',				NULL,								0.75,	0.75,	NULL,	1 ),
	( 'Slushie',			'Amazingly delicious frozen drink',	1.00,	1.00,	NULL,	1 ),
	( 'Pop',				NULL,								0.75,	0.75,	NULL,	1 ),
	( 'Tee Shirt',			NULL,								8.00,	10.00,	30,		2 ),
	( 'Long Sleeve Shirt',	NULL,								12.00,	15.00,	30,		2 ),
	( 'Sweat Shirt',		NULL,								14.00,	20.00,	30,		2 ),
	( 'Water Bottle',		NULL,								5.00,	8.00,	45,		2 );

INSERT INTO customer ( name, starting_balance, balance ) VALUES
	( 'Jody Bolt',		50.00,	50.00 ),
	( 'Ella Pusztai',	10.00,	10.00 ),
	( 'Aliz Pusztai',	20.00,	20.00 ),
	( 'Jacob Pusztai',	30.00,	30.00 ),
	( 'Lily Pusztai',	40.00,	40.00 );

INSERT INTO purchase ( created_at, customer_id, amount ) VALUES
	( '2017-06-19 12:00:00',	1,	0.88 ),
	( '2017-06-18 12:00:00',	1,	0.88 ),
	( '2017-06-17 12:00:00',	2,	1.75 ),
	( '2017-06-16 12:00:00',	1,	9.64 );

INSERT INTO sale_item ( purchase_id, product_id, sold_price ) VALUES
	( 1,	3,	0.50 ),
	( 1,	4,	0.38 ),
	( 2,	3,	0.50 ),
	( 2,	4,	0.38 ),
	( 3,	1,	0.75 ),
	( 3,	2,	0.75 ),
	( 3,	1,	0.75 ),
	( 3,	2,	0.75 ),
	( 4,	1,	0.38 ),
	( 4,	2,	0.38 ),
	( 4,	3,	0.50 ),
	( 4,	4,	0.38 ),
	( 4,	5,	8.00 );
