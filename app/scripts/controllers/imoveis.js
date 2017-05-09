'use strict';

angular.module('alabama.controllers')
	.controller('ImoveisCtrl', ImoveisCtrl);

ImoveisCtrl.$inject = ['$rootScope', '$scope', 'ImmobileManager'];

function ImoveisCtrl($rootScope, $scope, ImmobileManager) {

	var self = this, filtros = { };

	this.cardList = [];	
	this.pagination = {
		index: 0,
		totalItems: 0,
		itemsPerPage: 12,
		getPageAmount: function() {
			return Math.round(this.totalItems / this.itemsPerPage);
		},
		goTo: function(page) {
			if (page < 0 || page >= this.getPageAmount()) return;

			this.index = page;
			getCardList(this.itemsPerPage * this.index + ',' + this.itemsPerPage, filtros);
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

	$scope.$on('newSearch', function(event, filters) {
		angular.extend(filtros, filters);
		self.pagination.goTo(0);
	});

	function getCardList(limit, filters) {
		self.cardList = [];
		$rootScope.loading.load();
		ImmobileManager.loadAllImmobiles(limit, filters).then(function(success) {
			angular.forEach(success.data, function(item) {
				self.cardList.push(item.convertToCardInfo());
			});
			self.pagination.totalItems = success.info.immobile_count;
			console.log(self.cardList);
			$rootScope.scrollTop(300, 1);
			$rootScope.loading.unload();			
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});
	}
}