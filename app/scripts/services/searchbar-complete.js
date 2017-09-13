
(function() {

	'use strict';

	angular.module('alabama.services')
		.factory('SearchbarComplete', [function() {

			var _filters = null;

			return {
				setFilters: function(filters) {
					_filters = JSON.stringify(filters);
				},

				getFilters: function() {
					if (!_filters) return;

					return JSON.parse(_filters);
				}
			}

		}]);

}());