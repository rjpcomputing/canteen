( function()
{
	var appVersion = "17.06-dev";
	//
	angular.module( "CanteenApp", [ "Canteen.Login", "Canteen.About", "ui.router", "ui.bootstrap", "angular-loading-bar", "ngAnimate", "ngCookies" ] )

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
			$scope.currentUser = {};
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
			$scope.LoadUserDetails();
		}
	} ]);
} )();
