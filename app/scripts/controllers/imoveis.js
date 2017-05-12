'use strict';

angular.module('alabama.controllers')
	.controller('ImoveisCtrl', ImoveisCtrl);

ImoveisCtrl.$inject = ['$rootScope', '$scope', '$location', '$timeout', 'ImmobileManager'];

function ImoveisCtrl($rootScope, $scope, $location, $timeout, ImmobileManager) {

	var self = this, filtros = { };

	(function getParams() {
		angular.extend(filtros, $location.search());
		if (filtros.order)
			filtros.order = JSON.parse(filtros.order);
		else
			filtros.order = {column: 0, order: 0};
		$timeout(function() {
			$scope.$broadcast('updateFilters', filtros);
		});
		console.log('OS PARAMS:', filtros);
	}());

	this.getFiltros = function() {
		return filtros;
	};

	this.cardList = [];	
	this.resumo = [];
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

	// $scope.$on('newSearch', function(event, filters) {
	// 	angular.extend(filtros, filters);
	// 	self.pagination.goTo(0);
	// });

	function getCardList(limit, filters) {
		self.cardList = [];
		$rootScope.loading.load();
		ImmobileManager.loadAllImmobiles(limit, filters).then(function(success) {
			angular.forEach(success.data, function(item) {
				self.cardList.push(item.convertToCardInfo());
			});
			self.pagination.totalItems = success.info.summary ? success.info.summary.immobiles : 0;
			self.resumo = success.info.summary ? success.info.summary.features : { };
			console.log(self.resumo);
			console.log(self.cardList);
			$rootScope.scrollTop(300, 1);
			$rootScope.loading.unload();			
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});
	}

	// Fixa o menu lateral de filtros quando o usuario dá scroll na tela
	$scope.$watch(function(scope) {
		return $rootScope.scrollY;
	}, updateSideMenu);

	// Para evitar que o menu fique por cima do footer ao descer recolhido e abrir depois
	jQuery('.container-doido .collapse')
		.on('shown.bs.collapse', updateSideMenu)
		.on('hidden.bs.collapse', updateSideMenu);

	function updateSideMenu() {
		console.log(' u[date saoe ,emiu');
		var containerFilters = new function() {
			this.elem = jQuery('.filters > .container-doido');
			this.originalWidth = this.elem.css('width');
			this.height =  parseInt(this.elem.css('height'));
			this.filters = new function() {
				this.elem = jQuery('.filters');
				this.top = this.elem.position().top + 75;
			};
		};

		var y = $rootScope.scrollY,
			// pageBottom = jQuery('.footer').position().top - y - jQuery(window).innerHeight(), 
			pageBottom = jQuery('.footer').position().top - y - containerFilters.height, 
			cardListHeight = parseInt(jQuery('div[name="card-list"]').css('height'));

		// Se o menu lateral for maior que os resultados, retira a classe floating e nao age no menu.
		if (cardListHeight <= containerFilters.height) {
			containerFilters.elem.removeClass('floating').css('width', '100%').css('margin-top', 90);
			return;
		}

		if (containerFilters.filters.top - y <= 0) {
			containerFilters.elem.addClass('floating').css('width', containerFilters.originalWidth).css('margin-top', 15);

			// Aqui empurra o menu pra cima quando bate no fim da pagina (15px antes do fim)
			if (pageBottom < 15) {
				containerFilters.elem.css('margin-top', pageBottom);// - 130);
			}
		} else {
			containerFilters.elem.removeClass('floating').css('width', '100%').css('margin-top', 90);
		}
	}

	this.setFiltro = function(filter, value) {

		switch (filter) {
			case 'order':
				filtros.order = value;
				break;
			case 'bedroom': 
				if (filtros.dormitorios == value)
					filtros.dormitorios = null;
				else
					filtros.dormitorios = value
				break;

			case 'bathroom': 
				if (filtros.banheiros == value)
					filtros.banheiros = null;
				else
					filtros.banheiros = value;
				break;

			case 'suite': 
				if (filtros.suite == value)
					filtros.suite = null;
				else
					filtros.suite = value;
				break;

			case 'parking_spot': 
				if (filtros.garagem == value)
					filtros.garagem = null;
				else
					filtros.garagem = value;
				break;
		}

		$scope.$broadcast('update&search', filtros);
	};
}