'use strict';

angular.module('alabama.services')
	.factory('ImmobileManager', ['$http', '$q', 'URLS', 'Immobile', function($http, $q, URLS, Immobile) {  

		return {

			loadAllImmobiles: function() {
				var deferred = $q.defer();
				
				$http({
					method: 'POST',
					url: URLS.root + 'api/immobile.php?module=getList',
					crossDomain: true,
					data: {
						json: 1,
						get_Address: true,
						get_District: true,
						get_City: true,
						get_UF: true,
						get_GalleryImage: true
					}
				}).then(function(immobileData) {
					var array = [ ];						
					
					angular.forEach(immobileData.data.data, function(item) {
						array.push(new Immobile(item));
					});

					deferred.resolve(array);
				}, function(error) {
					console.log('deu erro: ' + error);
					deferred.reject();
				});

				return deferred.promise;
			},

			loadAllFeatured: function() {
				var deferred = $q.defer();
				
				$http({
					method: 'POST',
					url: URLS.root + 'api/immobile.php?module=getListFeatured',
					crossDomain: true,
					data: {
						json: 1,
						get_Address: true,
						get_District: true,
						get_City: true,
						get_UF: true,
						get_GalleryImage: true
					}
				}).then(function(immobileData) {
					var array = [ ];						
					
					angular.forEach(immobileData.data.data, function(item) {
						array.push(new Immobile(item));
					});

					deferred.resolve(array);
				}, function(error) {
					console.log('deu erro: ' + error);
					deferred.reject();
				});

				return deferred.promise;
			}

		}

	}]);