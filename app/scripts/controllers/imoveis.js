'use strict';

angular.module('alabama.controllers')
	.controller('ImoveisCtrl', ImoveisCtrl);

ImoveisCtrl.$inject = ['$rootScope', '$scope', 'ImmobileManager'];

function ImoveisCtrl($rootScope, $scope, ImmobileManager) {

	var self = this;

	this.cardList = [];	
	this.pagination = {
		index: 0,
		totalItems: 20,
		itemsPerPage: 12,
		getPageAmount: function() {
			return Math.round(this.totalItems / this.itemsPerPage);
		},
		goTo: function(page) {
			this.index = page;
			getCardList(this.itemsPerPage * this.index + ',' + this.itemsPerPage);
		},
		hidePage: function(page) {
			if (this.index <= 2) {
				return page > 4;
			} else if (this.index > 2 && this.index < this.total - 2){
				return page < this.index - 2 || page  > this.index + 2;
			} else if (this.index >= this.total - 2) {
				return page < this.total - 5;
			}
		}
	};

	$scope.$on('$viewContentLoaded', function() {
		getCardList(self.pagination.itemsPerPage);
	});

	function getCardList(limit) {
		self.cardList = [];
		$rootScope.loading.load();
		ImmobileManager.loadAllImmobiles(limit).then(function(success) {
			angular.forEach(success, function(item) {
				self.cardList.push(item.convertToCardInfo());
			});
			console.log(self.cardList);
			$rootScope.loading.unload();
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});
	}
}