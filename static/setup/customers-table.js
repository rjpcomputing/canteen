angular.module( "Canteen.CustomersTable", ["ui.bootstrap", "Canteen.Services"] )

.component( "customersTable",
{
	templateUrl: "setup/customers-table.html",
	bindings:
	{
		customers: "=",
		filter: "=",
		onUpdate: "&",
		onDelete: "="
	},
	controller: [ "Customer", function( Customer )
	{
		this.StartEditing = ( customer ) =>
		{
			customer.editing = true;
			customer.new_starting_balance = customer.starting_balance;
			customer.new_balance = customer.balance;
		};

		this.EditCustomer = ( customer ) =>
		{
			Customer.get( { id: customer.id }, ( cust ) =>
			{
				let currentCustomer = cust.customer;
				currentCustomer.starting_balance = customer.new_starting_balance;
				currentCustomer.balance = customer.new_balance;
				Customer.save( { id: currentCustomer.id }, currentCustomer, () => this.onUpdate() );
			} ).$promise
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

		this.CancelEditing = ( customer ) =>
		{
			customer.editing = false;
			this.newCustomerStartingBalance = customer.starting_balance;
			this.newCustomerBalance = customer.balance;
		};

		this.DeleteCustomer = ( customer ) => this.onDelete( customer );
	} ]
} )
;