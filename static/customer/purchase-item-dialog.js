angular.module( "Canteen.PurchaseItemDialog", [ "ui.bootstrap", "Canteen.Services" ] )

	.controller( "PurchaseItemDialogCtrl", [ "$scope", "$uibModalInstance", "customer", "purchase",
		function( $scope, $uibModalInstance, customer, purchase ) {
			$scope.customer = customer;
			$scope.purchase = purchase;
			$scope.saleItems = purchase.sale_item;
			$scope.Ok = () => $uibModalInstance.dismiss( "ok" );
		} ] )

;
