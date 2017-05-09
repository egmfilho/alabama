'use strict';

angular.module('alabama.services')
	.factory('Filters', ['$http', '$q', 'URLS', function($http, $q, URLS) {

		function Filters(filtersData) {
			if (filtersData) {
				this.setData(filtersData);
			}
		}

		Filters.prototype = {
			setData: function(filtersData) {
				angular.extend(this, filtersData);
			},
			load: function() {
				var deferred = $q.defer(),
					scope = this;
				
				$http({
					method: 'GET',
					url: URLS.root + 'api/filter.php?module=getAll',
					crossDomain: true
				}).then(function(response) {
					scope.setData(response.data.data);
					deferred.resolve();
				}, function(error) {
					console.log('deu erro: ' + error);
					deferred.reject();
				});

				return deferred.promise;
			}
		}

		return Filters;

	}]);