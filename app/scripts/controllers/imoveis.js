'use strict';

angular.module('alabama.controllers')
	.controller('ImoveisCtrl', ImoveisCtrl);

ImoveisCtrl.$inject = ['$rootScope', '$scope', 'ImmobileManager'];

function ImoveisCtrl($rootScope, $scope, ImmobileManager) {

	var self = this;

	this.cardList = [];

	$scope.$on('$viewContentLoaded', function() {
		$rootScope.startBootstrapSelect();
		getCardList();
	});

	function getCardList() {
		self.cardList = [];
		ImmobileManager.loadAllImmobiles().then(function(success) {
			console.log(success);
			angular.forEach(success, function(item) {
				console.log(parseInt(item.immobile_value));
				self.cardList.push(item.convertToCardInfo());
			});
		}, function(error) {
			console.log(error);
		});
	}
}