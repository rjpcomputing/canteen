angular.module( "Canteen.Setup", ["ui.bootstrap", "Canteen.Services"] )

	.controller( "SetupCtrl", ["$scope",
		function( _$scope ) {
		}] )

	.controller( "EventsCtrl", ["$scope", "$state", "Event", "UI",
		function( $scope, $state, Event, UI ) {
			$scope.loading = true;
			$scope.isAddEventFormCollapsed = true;
			$scope.selectedYear = new Date().getFullYear();
			$scope.availableYears = [( new Date().getFullYear() )];

			let GetAllEvents = ( _order ) => Event.query( { year: $scope.selectedYear }, ( data ) => $scope.events = data ).$promise;

			let GetAvailableYears = () => UI.eventyears( ( data ) => {
				const years = data.years;
				let availableYears = [];
				for ( var index = 0; index < years.length; ++index ) {
					availableYears.push( years[index].year );
				}
				$scope.availableYears = availableYears;
			} ).$promise;

			$scope.GetAllEvents = GetAllEvents;

			$scope.GotoEventDetails = ( eventId ) => $state.go( "event", { id: eventId } );

			$scope.AddEvent = () => Event.save( { description: $scope.eventName, start_date: $scope.eventStartDate, end_date: $scope.eventEndDate }, ( _eventId ) => {
				$scope.eventName = undefined;
				$scope.eventStartDate = undefined;
				$scope.eventEndDate = undefined;

				GetAvailableYears();
				GetAllEvents();
			} );

			$scope.DeleteEvent = ( $event, newEvent ) => {
				$event.stopPropagation();
				Event.get( { id: newEvent.id }, ( ev ) => ev.$delete( { id: ev.id }, () => GetAllEvents() ) );
				GetAvailableYears();
				$scope.selectedYear = new Date().getFullYear();
			};

			GetAllEvents()
				.then( () => GetAvailableYears() )
				.then( () => $scope.loading = false )
				.catch( errorDetails => {
					if ( errorDetails ) {
						$scope.errorMessage = "Error Occurred! " + errorDetails;
					}

					console.log( "Error Occurred!" );
					console.log( errorDetails );
				} );
		}] )

	.controller( "CustomersCtrl", ["$scope", "$state", "Customer",
		function( $scope, $state, Customer ) {
			$scope.loading = true;
			// $scope.editing = false;
			$scope.isAddCustomerFormCollapsed = true;

			let GetAllCustomers = ( _order ) => Customer.query( {}, ( data ) => $scope.customers = data.customer ).$promise;
			$scope.GetAllCustomers = GetAllCustomers;

			$scope.AddCustomer = () => {
				Customer.save( { name: $scope.customerName, starting_balance: $scope.customerStartingBalance, balance: $scope.customerStartingBalance }, ( _customerId ) => {
					$scope.customerName = undefined;
					$scope.customerStartingBalance = undefined;
					GetAllCustomers();
				} );
			};

			$scope.DeleteCustomer = ( customer ) => Customer.get( { id: customer.id }, ( cust ) => cust.$delete( { id: cust.customer.id }, () => GetAllCustomers() ) );

			GetAllCustomers()
				.then( () => $scope.loading = false )
				.catch( ( errorDetails ) => {
					if ( errorDetails ) {
						$scope.errorMessage = "Error Occurred! " + errorDetails;
					}

					console.log( "Error Occurred!" );
					console.log( errorDetails );
				} );
		}] )

;
