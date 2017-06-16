( function()
{
	var appVersion = "17.06-dev";
	//
	angular.module( "CanteenApp", [ "Canteen.Login", "Canteen.Store", "Canteen.Setup", "Canteen.Supply", "Canteen.CustomersTable", "Canteen.About", "ui.router", "ui.bootstrap", "angular-loading-bar", "ngAnimate", "ngCookies" ] )

	.config( ["$stateProvider", "$locationProvider", "$urlRouterProvider", function ( $stateProvider, $locationProvider, $urlRouterProvider )
	{
		$locationProvider.html5Mode( { enabled: true } );
		// $locationProvider.hashPrefix( "" );
		$stateProvider
		.state( "store",
		{
			url: "/",
			controller: "StoreCtrl",
			templateUrl: "store/store.html"
		} )
		.state( "user-profile",
		{
			url: "/profile",
			templateUrl: "profile/profile.html"
		} )
		.state( "supply",
		{
			url: "/supply",
			controller: "SupplyCtrl",
			templateUrl: "supply/supply.html"
		} )
		.state( "setup",
		{
			url: "/setup",
			controller: "SetupCtrl",
			templateUrl: "setup/setup.html"
		} )
		.state( "event",
		{
			url: "/event/:id",
			controller: "EventCtrl",
			templateUrl: "setup/event.html"
		} );
		$urlRouterProvider.otherwise( "/" );
	} ])

	.controller( "AppCtrl", [ "$scope", "$state", "$cookies", "$http", "$timeout", "$uibModal", 
	function ( $scope, $state, $cookies, $http, $timeout, $uibModal )
	{
		$scope.version = appVersion;
		$scope.isCollapsed = true;
		$scope.currentUser = { isLoggedIn: false };
		$scope.userCookieName = "user";

		$scope.ShowAboutDialog = function()
		{
			var modalInstance = $uibModal.open(
			{
				templateUrl: "common/about/about-dialog.tpl.html",
				controller: "AboutDialogCtrl",
				backdrop: "static"
			});
		};

		$scope.ShowLoginDialog = function()
		{
			var modalInstance = $uibModal.open(
			{
				templateUrl: "common/login/login-dialog.tpl.html",
				controller: "LoginDialogCtrl",
				backdrop: "static",
				keyboard: false
			});

			modalInstance.result.then( function( userDetails )
			{
console.log( "[DEBUG]", "login complete" );
				
				// $scope.currentUser = userDetails;
				// $cookies.putObject( $scope.userCookieName, $scope.currentUser );
				$state.go( "shop" );
			});
		};

		$scope.LoadUserDetails = function()
		{
			var userDetails = $cookies.getObject( $scope.userCookieName );
			if ( userDetails )
			{
				$scope.currentUser = userDetails;
			}
			else
			{
				$scope.ShowLoginDialog();
				// firebase.auth().signInAnonymously()
				// .catch( error =>
				// {
				// 	$scope.errorMessage = "Error Occurred! " + error.message;

				// 	console.log( "Error Occurred!" );
				// 	console.log( error );
				// } );
			}
		};

		$scope.IsAdmin = function()
		{
			if ( $scope.currentUser && $scope.currentUser.is_admin )
			{
				return true;
			}
			else
			{
				return false;
			}
		};

		$scope.Logout = function( userid )
		{
			firebase.auth().signOut()
			.then( () =>
			{
				$cookies.remove( $scope.userCookieName );
				$scope.currentUser = { isLoggedIn: false };
				$scope.LoadUserDetails();
			} )
			.catch( error =>
			{
				$scope.errorMessage = "Error Occurred! " + error.message;

				console.log( "Error Occurred!" );
				console.log( error );
			} );
		};

		firebase.auth().onAuthStateChanged( function ( user )
		{
			if ( user )
			{
				// User is signed in.
				$scope.currentUser =
				{
					id: user.uid,
					displayName: user.displayName,
					email: user.email,
					phoneNumber: user.phoneNumber,
					photoURL: user.photoURL,
					isAnonymous: user.isAnonymous,
					isLoggedIn: true,
				};

				$cookies.putObject( $scope.userCookieName, $scope.currentUser );
			}
			else
			{
				// User is signed out.
				$scope.currentUser = { isLoggedIn: false, };
			}

			$scope.$digest(); // Deal with any Angular scope changes
		} );

		if( navigator.sayswho.search( "IE" ) != -1 )
		{
			console.log( "IE found. Unsupported browser found.");
			window.location =  "unsupportedBrowser.html";
		}
		else
		{
			//console.log( "|> App Initializing..." );
			$scope.LoadUserDetails();
		}
	} ]);
} )();
