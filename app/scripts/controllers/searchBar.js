'use strict';

angular.module('alabama.controllers')
	.controller('SearchBarCtrl', SearchBar);

SearchBar.$inject = [ '$rootScope', '$scope', '$location', '$filter', '$timeout', 'Filters' ];

function SearchBar($rootScope, $scope, $location, $filter, $timeout, Filters) {

	var self = this;

	this.isReady = false;
	this.search = { };

	function disableAll() {
		jQuery('.selectpicker').attr('disabled', true).selectpicker('setStyle', 'disabled', 'add');
	};

	this.sliderPrice = {
		options: {
			disabled: false,
			floor: 1,
			ceil: 2000000,
			hideLimitLabels: true,
			// logScale: true,

			customValueToPosition: function(val, minVal, maxVal) {
				val = Math.sqrt(val);
				minVal = Math.sqrt(minVal);
				maxVal = Math.sqrt(maxVal);
				var range = maxVal - minVal;
				return (val - minVal) / range;
			},
			customPositionToValue: function(percent, minVal, maxVal) {
				minVal = Math.sqrt(minVal);
				maxVal = Math.sqrt(maxVal);
				var value = percent * (maxVal - minVal) + minVal;
				return Math.pow(value, 2);
			},

			showTicks: false,
			translate: function(value, sliderId, label) {
				var v = $filter('currency')(value, undefined, 0);

				switch (label) {
					// case 'model':
					//   return '<b>Min.</b> ' + v;
					// case 'high':
					//   return '<b>Max.</b> ' + v;
					default:
						return v;
				}
			}
		}
	};

	this.sliderArea = {
		options: {
			floor: 1,
			ceil: 500,
			hideLimitLabels: true,
			showTicks: false,
			translate: function(value, sliderId, label) {

				switch (label) {
					case 'model':
						return value + 'm<sup>2</sup>';
					case 'high':
						return value + 'm<sup>2</sup>';
					default:
						return value;
				}
			}
		}
	};

	this.filters = new Filters();
	$rootScope.loading.load();
	this.filters.load().then(function(res) {
		console.log(self.filters);
		
		self.search.minValue = parseFloat(self.filters.value.min);
		self.search.maxValue = parseFloat(self.filters.value.max);
		self.sliderPrice.options.floor = parseFloat(self.filters.value.min);
		self.sliderPrice.options.ceil = parseFloat(self.filters.value.max);

		self.search.minArea = parseFloat(self.filters.area.min);
		self.search.maxArea = parseFloat(self.filters.area.max);
		self.sliderArea.options.floor = parseFloat(self.filters.area.min);		
		self.sliderArea.options.ceil = parseFloat(self.filters.area.max);		

		self.isReady = true;

		$timeout(function() {
			$rootScope.startBootstrapSelect();
			$rootScope.loading.unload();
		}, 250);
	});

	this.pesquisar = function() {
		$scope.$emit('newSearch', this.search);
	};

	function updateSelects() {
		$timeout(function() { jQuery('.selectpicker').selectpicker('refresh'); }, 100);
	}

	$scope.$on('updateFilters', function(event, value) {
		angular.extend(self.search, value);
		updateSelects();
	});

	function generateUrl() {
		return {
			codigo: self.search.codigo,
			tipo: self.search.tipo,
			cidade: self.search.cidade
		}
	}

	this.selfRedirect = function() {
		$location.path('/imoveis').search(self.search);
	}
}