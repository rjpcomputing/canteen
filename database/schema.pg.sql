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
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS event_customer CASCADE;
DROP TABLE IF EXISTS sale CASCADE;
DROP TABLE IF EXISTS sale_product CASCADE;
DROP TRIGGER IF EXISTS update_event_updated_at ON event;
DROP TRIGGER IF EXISTS update_product_updated_at ON product;
DROP TRIGGER IF EXISTS update_customer_updated_at ON customer;
DROP TRIGGER IF EXISTS update_sale_updated_at ON customer;

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

CREATE TABLE product (
	id									BIGSERIAL PRIMARY KEY NOT NULL,
	created_at							TIMESTAMP DEFAULT now(),
	updated_at							TIMESTAMP DEFAULT now(),
	name								TEXT NOT NULL,
	description							TEXT DEFAULT NULL,
	price								FLOAT NOT NULL,
	stock								INTEGER DEFAULT 0
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
	CONSTRAINT unique_event_customer	UNIQUE ( event_id, customer_id )
);

CREATE TABLE sale (
	id									BIGSERIAL PRIMARY KEY NOT NULL,
	created_at							TIMESTAMP DEFAULT now(),
	updated_at							TIMESTAMP DEFAULT now(),
	customer_id							BIGINT NOT NULL REFERENCES customer(id) ON DELETE CASCADE,
	product_id							BIGINT NOT NULL REFERENCES product(id) ON DELETE CASCADE
);

-- PERMISSIONS ----------------------------------------------------------------
--
ALTER SCHEMA public OWNER TO canteen;

ALTER TABLE event OWNER TO canteen;
ALTER TABLE product OWNER TO canteen;
ALTER TABLE customer OWNER TO canteen;
ALTER TABLE event_customer OWNER TO canteen;
ALTER TABLE sale OWNER TO canteen;

-- TRIGGERS -------------------------------------------------------------------
--
CREATE TRIGGER update_event_updated_at BEFORE UPDATE ON event FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON product FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
CREATE TRIGGER update_customer_updated_at BEFORE UPDATE ON customer FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
CREATE TRIGGER update_sale_updated_at BEFORE UPDATE ON sale FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- DEFAULT DATA ---------------------------------------------------------------
--
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

INSERT INTO product ( name, description, cost, stock ) VALUES
	( 'Push Pops',	'Sucker like candy',	0.75,	24 ),
	( 'Coke',	'Coca Cola',	0.75,	48 ),
	( 'YooHoo',	'Chocolate drink',	1.00,	96 ),
	( 'Slushie',	'Amazingly delicious frozen drink',	1.00,	NULL ),
	( 'Pop',	NULL,	0.75,	192 );

INSERT INTO customer ( name, starting_balance ) VALUES
	( 'Ella Pusztai',	10.00 ),
	( 'Aliz Pusztai',	20.00 ),
	( 'Jacob Pusztai',	30.00 ),
	( 'Lily Pusztai',	40.00 );
