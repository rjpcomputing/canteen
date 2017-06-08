angular.module( "Canteen.Login", ["ui.bootstrap"] )

.controller( "LoginDialogCtrl", [ "$scope", "$uibModalInstance",
function( $scope, $uibModalInstance, Users )
{
	$scope.loginLabel = "Sign In";
	$scope.loginToggleLabel = "Create a new account";
	$scope.shouldSignUp = false;
	$scope.errorMessage = "";		// Clear the errors

	let SignUp = function()
	{
		firebase.auth().createUserWithEmailAndPassword( $scope.email, $scope.password )
		.then( () => $uibModalInstance.close( "close" ) )
		.catch( error =>
		{
			$scope.errorMessage = "Error Occurred! " + error.message;

			console.log( "Error Occurred!" );
			console.log( error );
			
			$scope.$digest();
		} );
	};

	let SignIn = function()
	{
		firebase.auth().signInWithEmailAndPassword( $scope.email, $scope.password )
		.then( () => $uibModalInstance.close( "close" ) )
		.catch( error =>
		{
			$scope.errorMessage = "Error Occurred! " + error.message;

			console.log( "Error Occurred!" );
			console.log( error );

			$scope.$digest();
		} );
	};

	$scope.LoginToggle = function()
	{
		$scope.shouldSignUp = !$scope.shouldSignUp;
		if ( $scope.shouldSignUp )
		{
			$scope.loginLabel = "Add User";
			$scope.loginToggleLabel = "Sign In";
		}
		else
		{
			$scope.loginLabel = "Sign In";
			$scope.loginToggleLabel = "Create a new account";
		}
	};
	
	$scope.Submit = function()
	{
		if ( $scope.shouldSignUp )
		{
			SignUp();
		}
		else
		{
			SignIn();
		}
	};

	let LoginAnonymously = function()
	{
		firebase.auth().signInAnonymously()
		.catch( error =>
		{
			$scope.errorMessage = "Error Occurred! " + error.message;

			console.log( "Error Occurred!" );
			console.log( error );
			
			$scope.$digest();
		} );
	};

	$scope.Cancel = function()
	{
		$uibModalInstance.dismiss( "cancel" );
	};
} ])

;
