'use strict';

angular.module('alabama.controllers')
	.controller('SearchBarCtrl', SearchBar);

SearchBar.$inject = [ '$rootScope', '$scope', '$filter' ];

function SearchBar($rootScope, $scope, $filter) {

	this.search = { };

	setTimeout(function() {
		$rootScope.startBootstrapSelect();
	}, 500);

	function disableAll() {
		jQuery('.selectpicker').attr('disabled', true).selectpicker('setStyle', 'disabled', 'add');
	};

	this.search.sliderPrice = {
		minValue: 1,
		maxValue: 2000000,		
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

	this.search.sliderArea = {
		minValue: 1,
		maxValue: 500,
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

	this.pesquisar = function() {
		console.log(this.search);
	};

}