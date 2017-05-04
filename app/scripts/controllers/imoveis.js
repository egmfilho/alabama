'use strict';

angular.module('alabama.controllers')
	.controller('ImoveisCtrl', ImoveisCtrl);

ImoveisCtrl.$inject = ['$rootScope', '$scope', 'ImmobileManager'];

function ImoveisCtrl($rootScope, $scope, ImmobileManager) {

	var self = this;

	this.cardList = [];	

	$scope.$on('$viewContentLoaded', function() {
		getCardList();
	});

	function getCardList() {
		self.cardList = [];
		$rootScope.loading.load();
		ImmobileManager.loadAllImmobiles().then(function(success) {
			angular.forEach(success, function(item) {
				self.cardList.push(item.convertToCardInfo());
			});
			$rootScope.loading.unload();
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});
	}
}