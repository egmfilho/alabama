'use script';

angular.module('alabama.controllers')
	.controller('ContatoCtrl', ['$rootScope', '$scope', 'NgMap', 'ImmobileManager', function($rootScope, $scope, NgMap, ImmobileManager) {

		var self = this;

		NgMap.getMap().then(function(map) {
			self.map = map;
		});

		this.mapInfo = {
			title: 'Grupo Paiva',
			address: 'Rua Azul de Setembro, Bairo dos Manolo 333 - Teresópolis RJ - 28000-180',
			contact: '(21) 99999-8888'
		};

		self.array = [];
		$rootScope.loading.load();
		ImmobileManager.loadMostVisited().then(function(success) {
			angular.forEach(success, function(item) {			
				self.array.push(item.convertToCardInfo());
			});
			$rootScope.loading.unload();
			console.log(self.array);
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});

		jQuery('form').on('submit', function(e) {
			e.stopPropagation();
			e.preventDefault();
			$rootScope.loading.load();
			jQuery.ajax({
				url: './external/mail.php',
				method: 'POST',
				dataType: 'json',
				data: jQuery('form').serialize(),
				success: function(data) {
					$rootScope.loading.unload();
					$scope.$apply();
				},
				error: function(data) {
					$rootScope.loading.unload();
					$scope.$apply();
				}
			});
		});

}]);