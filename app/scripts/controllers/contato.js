'use script';

angular.module('alabama.controllers')
	.controller('ContatoCtrl', ['NgMap', function(NgMap) {

		var self = this;

		NgMap.getMap().then(function(map) {
			self.map = map;
		});

		this.mapInfo = {
			title: 'Grupo Paiva',
			address: 'Rua Azul de Setembro, Bairo dos Manolo 333 - Teresópolis RJ - 28000-180',
			contact: '(21) 99999-8888'
		};

}]);