'use script';

angular.module('alabama.controllers')
	.controller('ContatoCtrl', ['$rootScope', '$scope', 'NgMap', 'ImmobileManager', function($rootScope, $scope, NgMap, ImmobileManager) {

		var self = this;

		NgMap.getMap().then(function(map) {
			self.map = map;
		});

		this.mapInfo = {
			title: 'Grupo Paiva Corretora e Imobiliária',
			address: 'Av. Oliveira Botelho, 499 - Alto, Teresópolis - RJ, 25961-145',
			contact: '(21) 2642-3468'
		};

		self.array = [];
		$rootScope.loading.load();
		ImmobileManager.loadMostVisited().then(function(success) {
			angular.forEach(success, function(item) {			
				self.array.push(item.convertToCardInfo());
			});
			$rootScope.loading.unload();
		}, function(error) {
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