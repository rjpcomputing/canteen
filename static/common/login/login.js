angular.module( "Traction.Login", ["ui.router", "ui.bootstrap.modal.dialog", "ngCookies", "Traction.Services"] )


.controller( "LoginDialogCtrl", [ "$scope", "$uibModalInstance", "Users",
function( $scope, $uibModalInstance, Users )
{
	$scope.Login = function()
	{
		$scope.errorMessage = "";		// Clear the errors

		var fd = new FormData();
		fd.append( "username", $scope.username );
		fd.append( "password", $scope.password );
		Users.login( fd, function( data, status, headers )
		{
			location.reload();
			$uibModalInstance.close( data );
		},
		function( errorDetails )
		{
			$scope.errorMessage = "Error Occurred! Invalid username or password. " + errorDetails.data.userMessage + ".";

			console.log( "Error Occurred!" );
			console.log( errorDetails.data );
		} );
	};

	$scope.Cancel = function()
	{
		$uibModalInstance.dismiss( "cancel" );
	};
} ])

;
