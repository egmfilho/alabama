'use strict';

angular.module('alabama.controllers')
	.controller('ImoveisCtrl', ImoveisCtrl);

ImoveisCtrl.$inject = ['$rootScope', '$scope', '$location', 'ImmobileManager'];

function ImoveisCtrl($rootScope, $scope, $location, ImmobileManager) {

	var self = this, filtros = { };

	(function getParams() {
		console.log($location.search());
		filtros.codigo = $location.search().codigo;
		filtros.tipo = $location.search().tipo;
		filtros.cidade = $location.search().cidade;
		setTimeout(function() {$scope.$broadcast('updateFilters', filtros);}, 200);
	}());

	this.getFiltros = function() {
		return filtros;
	};

	this.cardList = [];	
	this.pagination = {
		index: 0,
		totalItems: 0,
		itemsPerPage: 12,
		getLabelResultado: function() {
			if (this.totalItems == 0) {
				return 'Nenhum imóvel encontrado';
			} else if (this.totalItems == 1) {
				return '1 imóvel encontrado';
			} else {
				return this.totalItems + ' imóveis encontrados';
			}
		},
		getPageAmount: function() {
			return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
		},
		goTo: function(page) {
			if (page >= 0 && page < this.getPageAmount()) {
				this.index = page;
				getCardList(this.itemsPerPage * this.index + ',' + this.itemsPerPage, filtros);
			} else {
				console.log('page out of range', page);
			}
		},
		hidePage: function(page) {
			if (this.index <= 2) {
				return page > 4;
			} else if (this.index > 2 && this.index < this.total - 2){
				return page < this.index - 2 || page  > this.index + 2;
			} else if (this.index >= this.total - 2) {
				return page < (this.total - 1) - 4;
			}
		}
	};

	$scope.$on('$viewContentLoaded', function() {
		getCardList(self.pagination.itemsPerPage, filtros);
	});

	$scope.$on('$locationChangeStart', function() {
		$location.search({});
	});

	$scope.$on('newSearch', function(event, filters) {
		angular.extend(filtros, filters);
		console.log('almondega', filtros);
		self.pagination.goTo(0);
	});

	function getCardList(limit, filters) {
		self.cardList = [];
		$rootScope.loading.load();
		ImmobileManager.loadAllImmobiles(limit, filters).then(function(success) {
			angular.forEach(success.data, function(item) {
				self.cardList.push(item.convertToCardInfo());
			});
			self.setResumo();
			self.pagination.totalItems = success.info.immobile_count;
			console.log(self.cardList);
			$rootScope.scrollTop(300, 1);
			$rootScope.loading.unload();			
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});
	}

	this.setResumo = function() {
		this.resumo = {
			'Dormitórios': {
				model: 'dormitorios',
				labels: ['1 dormitório', '2 dormitórios', '3 dormitórios', '4+ dormitórios'],
				data: { 1: 0, 2: 0, 3: 0, 4: 0 }
			},
			'Banheiros': {
				model: 'banheiros',
				labels: ['1 banheiro', '2 banheiros', '3 banheiros', '4+ banheiros'],
				data: { 1: 0, 2: 0, 3: 0, 4: 0 }
			},
			'Suíte': {
				model: 'suite',
				labels: ['Com suíte', 'Sem suíte'],
				data: { 1: 0, 2: 0 }
			},
			'Garagem': {
				model: 'garagem',
				labels: ['Com garagem', 'Sem garagem'],
				data: { 1: 0, 2: 0 }
			}
		};

		angular.forEach(self.cardList, function(item, index) {
			self.resumo['Dormitórios'].data[Math.min(item.bed, 4)]++;
			self.resumo['Banheiros'].data[Math.min(item.bath, 4)]++;
			self.resumo['Suíte'].data[!item.suite ? 1 : 2]++;
			self.resumo['Garagem'].data[!item.garagem ? 1 : 2]++;
		});

		console.log(self.resumo);
	}
}