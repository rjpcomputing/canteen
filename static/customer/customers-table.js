angular.module( "Canteen.CustomersTable", ["ui.bootstrap", "Canteen.Services"] )

.component( "customersTable",
{
	templateUrl: "customer/customers-table.html",
	bindings:
	{
		customers: "=",
		filter: "=",
		eventId: "=",
		onUpdate: "&",
		onDelete: "="
	},
	controller: [ "Customer", "Event", "UI", function( Customer, Event, UI )
	{
		let GetCustomerTypes = () => UI.customertypes( ( data, headers ) => this.customerTypes = data.customer_type ).$promise;

		this.StartEditing = ( customer ) =>
		{
			customer.editing = true;
			customer.new_name = customer.name;
			customer.new_starting_balance = customer.starting_balance;
			customer.new_balance = customer.balance;
			customer.new_type = { id: customer.type_id, type: customer.type };
		};

		this.EditCustomer = ( customer ) =>
		{
			let currentCustomer = customer;
			currentCustomer.name = customer.new_name;
			currentCustomer.starting_balance = customer.new_starting_balance;
			currentCustomer.balance = customer.new_balance;
			currentCustomer.type_id = customer.new_type.id;
			currentCustomer.type = customer.new_type.type;

			Customer.get( { id: customer.id } ).$promise
			.then( ( cust ) => Customer.save( { id: currentCustomer.id }, currentCustomer ).$promise )
			.then( ( ret ) => Event.updatecustomer( { id: this.eventId, opt: currentCustomer.id }, { type_id: currentCustomer.type_id } ).$promise )
			.then( ( ret ) => this.onUpdate() )
			.then( () => customer.editing = false )
			.catch( errorDetails =>
			{
				if ( errorDetails )
				{
					this.errorMessage = "Error Occurred! " + errorDetails;
				}

				console.log( "Error Occurred!" );
				console.log( errorDetails.data || errorDetails );
			} );
		};

		this.CancelEditing = ( customer ) => customer.editing = false;

		this.DeleteCustomer = ( customer ) => this.onDelete( customer );

		GetCustomerTypes()
		.catch( errorDetails =>
		{
			if ( errorDetails )
			{
				this.errorMessage = "Error Occurred! " + errorDetails;
			}

			console.log( "Error Occurred!" );
			console.log( errorDetails.data || errorDetails );
		} );
	} ]
} )
;