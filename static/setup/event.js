angular.module( "Canteen.Event", ["Canteen.Services"] )

	.controller( "EventCtrl", ["$scope", "$stateParams", "Event", "Customer", "UI",
		function( $scope, $stateParams, Event, Customer, UI ) {
			$scope.loading = true;
			$scope.isAddCustomerFormCollapsed = false;
			$scope.customerToAdd = undefined;
			$scope.customerBalance = 0;
			$scope.selectedCustomerType = undefined;

			let GetEvent = ( eventId ) => Event.get( { id: eventId }, ( data ) => $scope.event = data ).$promise;
			let GetEventsCustomers = ( eventId ) => Event.customers( { id: eventId }, {}, ( data ) => $scope.customers = data.customer ).$promise;
			$scope.GetEventsCustomers = GetEventsCustomers;
			$scope.IsObject = angular.isObject;

			let GetCustomerTypes = () => UI.customertypes( ( data ) => {
				$scope.customerTypes = data.customer_type;
				$scope.selectedCustomerType = $scope.customerTypes[0];
			} ).$promise;

			let TitleCase = ( str ) => {
				var splitStr = str.toLowerCase().split( " " );
				for ( var i = 0; i < splitStr.length; i++ ) {
					// You do not need to check if i is larger than splitStr length, as your for does that for you
					// Assign it back to the array
					splitStr[i] = splitStr[i].charAt( 0 ).toUpperCase() + splitStr[i].substring( 1 );
				}
				// Directly return the joined string
				return splitStr.join( " " );
			};

			$scope.OnCustomerSelected = function( $item ) {
				if ( $item ) {
					$scope.customerBalance = $item.balance;
				}
			};

			$scope.GetCustomersByName = ( name ) => {
				return Customer.byname( { cmd: name } ).$promise
					.then( ( data ) => data.customer );
			};

			$scope.AddCustomer = ( customer, customerBalance ) => {
				// let shouldSave = true;
				// if ( customerBalance <= 0 ) {
				// 	shouldSave = confirm( `Are you sure you want to add '${TitleCase( customer )}' with a balance of $${customerBalance}.` );
				// }

				// if ( shouldSave ) {
				// 	Customer.save( { name: TitleCase( customer ), starting_balance: customerBalance, balance: customerBalance }, ( res ) => {
				// 		$scope.customerToAdd = { id: res.customer.id, name: TitleCase( customer ), starting_balance: customerBalance, balance: customerBalance };
				// 		$scope.noResults = false;
				// 	} );
				// }

				Customer.save( { name: TitleCase( customer ), starting_balance: customerBalance, balance: customerBalance }, ( res ) => {
					$scope.customerToAdd = { id: res.customer.id, name: TitleCase( customer ), starting_balance: customerBalance, balance: customerBalance };
					$scope.noResults = false;
				} );
			};

			$scope.AddCustomerToEvent = ( customer ) => {
				customer.balance = $scope.customerBalance;
				customer.starting_balance = $scope.customerBalance;
				Customer.save( { id: customer.id }, customer ).$promise
					.then( () => {
						return Event.addcustomer( { id: $stateParams.id, opt: customer.id }, { type_id: $scope.selectedCustomerType.id, type: $scope.selectedCustomerType.type } ).$promise;
					} )
					.then( ( _data ) => {
						$scope.customerToAdd = undefined;
						$scope.customerBalance = 0;
						$scope.selectedCustomerType = $scope.customerTypes[0];
						GetEventsCustomers( $stateParams.id );
					} );
			};

			$scope.DeleteCustomer = ( customer ) => {
				Event.deletecustomer( { id: $stateParams.id, opt: customer.id }, {}, ( _data ) => {
					GetEventsCustomers( $stateParams.id );
				} );
			};

			GetEvent( $stateParams.id )
				.then( GetCustomerTypes )
				.then( () => GetEventsCustomers( $stateParams.id ) )
				.then( () => $scope.loading = false )
				.catch( errorDetails => {
					if ( errorDetails ) {
						$scope.errorMessage = "Error Occurred! " + errorDetails;
					}

					console.log( "Error Occurred!" );
					console.log( errorDetails.data || errorDetails );
				} );
		}] );
