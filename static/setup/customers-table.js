angular.module( "Canteen.CustomersTable", ["ui.bootstrap", "Canteen.Services"] )

.component( "customersTable",
{
	templateUrl: "setup/customers-table.html",
	bindings:
	{
		customers: "=",
		filter: "=",
		onUpdate: "&"
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
			Customer.get( { id: customer.id }, ( c ) =>
			{
				c.starting_balance = customer.new_starting_balance;
				c.balance = customer.new_balance;
				c.$save( { id: c.id }, () => this.onUpdate() );
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

		this.DeleteCustomer = ( customer ) => Customer.get( { id: customer.id }, ( c ) => c.$delete( { id: c.id }, () => this.onUpdate() ) );
	} ]
} )
;