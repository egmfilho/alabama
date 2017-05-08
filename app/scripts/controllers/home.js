'use strict';

angular.module('alabama.controllers')
.controller('HomeCtrl', ['$rootScope', '$scope', 'ImmobileManager', function ($rootScope, $scope, ImmobileManager) {

	var self = this;

	function getDestaques() {
		self.featuredList = [];
		$rootScope.loading.load();
		ImmobileManager.loadAllFeatured().then(function(success) {
			angular.forEach(success, function(item) {			
				self.featuredList.push(item.convertToCardInfo());
			});
			$rootScope.loading.unload();
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});
	}

	function getUltimos() {
		self.lastOnes = [];
		$rootScope.loading.load();
		ImmobileManager.loadLastOnes().then(function(success) {
			angular.forEach(success, function(item) {			
				self.lastOnes.push(item.convertToCardInfo());
			});
			$rootScope.loading.unload();
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});	
	}

	$scope.$on('$viewContentLoaded', function() {
		getDestaques();
		getUltimos();
	});
	
}]);
