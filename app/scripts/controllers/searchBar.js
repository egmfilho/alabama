'use strict';

angular.module('alabama.controllers')
	.controller('SearchBarCtrl', SearchBar);

SearchBar.$inject = [ '$scope', '$filter' ];

function SearchBar($scope, $filter) {

		this.sliderPrice = {
		minValue: 1,
		maxValue: 2000000,
		options: {
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

}