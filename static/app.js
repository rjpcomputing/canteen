( function()
{
	var appVersion = "16.12-1";

	angular.module( "CanteenApp", [ "Canteen.About", "ui.bootstrap", "ngRoute", "ngAnimate", "ngCookies" ] )

	//.config(['$routeProvider', '$locationProvider',
	  //function($routeProvider, $locationProvider) {
		//$routeProvider
		  //.when('/about', {
			//templateUrl: 'common/about/about-dialog.tpl.html',
			//controller: 'AboutDialogCtrl'
		  //});
//
		//$locationProvider.html5Mode(true);
	//}])

	.controller( "AppCtrl", [ "$scope", "$location", "$cookies", "$http", "$timeout", "$uibModal",
	function ( $scope, $location, $cookies, $http, $timeout, $uibModal )
	{
		$scope.version = appVersion;
		$scope.currentUser = {};
		$scope.userCookieName = "user";
		$scope.displayCookieName = "display";

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
				$scope.currentUser = userDetails;
				$cookies.putObject( $scope.userCookieName, $scope.currentUser );
				$state.go( "tickets" );
			});
		};

		$scope.LoadUserDetails = function()
		{
			var userDetails = $cookies.getObject( $scope.userCookieName );
			if ( userDetails )
			{
				$scope.currentUser = userDetails;
				// Get any new details
				//Users.get( { id: userDetails.id }, function( data, status, headers )
				//{
					//$scope.currentUser = data;
					//var cookieDetails = {
						//id: data.id,
						//firstname: data.firstname,
						//lastname: data.lastname,
						//username: data.username,
						//email: data.email,
						//ignore_own_changes: data.ignore_own_changes
					//};
//
					//$cookies.putObject( $scope.userCookieName, cookieDetails );
				//} );
			}
			else
			{
				$scope.ShowLoginDialog();
			}
		};

		$scope.IsLoggedIn = function()
		{
			if ( $scope.currentUser && $scope.currentUser.id )
			{
				return true;
			}
			else
			{
				return false;
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
			$cookies.remove( $scope.userCookieName );
			$cookies.remove( $scope.displayCookieName );
			$scope.currentUser = {};
			$scope.display = {};
			$scope.LoadUserDetails();
		};

		if( navigator.sayswho.search( "IE" ) != -1 )
		{
			console.log( "IE found. Unsupported browser found.");
			window.location =  "unsupportedBrowser.html";
		}
		else
		{
			//console.log( "|> App Initializing..." );
			// Initialize display cookie
			if ( !$cookies.getObject( $scope.displayCookieName ) )
			{
				var initialDisplayValues =
				{
					store:
					{
						display: "active",
						sort:
						{
							reverse: true,
							type: "id"
						}
					},
					Supply:
					{
						display: "active",
						sort:
						{
							reverse: true,
							type: 'id'
						}
					}
				};
				$cookies.putObject( $scope.displayCookieName, initialDisplayValues );
			}
			$scope.display = $cookies.getObject( $scope.displayCookieName );
			$scope.LoadUserDetails();
		}
	} ]);
} )();
