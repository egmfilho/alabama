'use strict';

angular.module('alabama.services')
	.factory('ImmobileManager', ['$http', '$q', 'URLS', 'Immobile', function($http, $q, URLS, Immobile) {  

		return {

			loadAllImmobiles: function(limit, filtros) {
				var deferred = $q.defer(),
					filters, data;

				filters = !filtros ? {} : {
					immobile_code: filtros.codigo,
					immobile_type: filtros.tipo,
					immobile_address: {
						city_id: filtros.cidade,
						district_id: filtros.bairro
					},
					immobile_category_id: filtros.categoria,
					immobile_area_total: {
						min: filtros.sliderArea ? filtros.sliderArea.minValue : null,
						max: filtros.sliderArea ? filtros.sliderArea.maxValue : null
					},
					immobile_value: {
						min: filtros.sliderPrice ? filtros.sliderPrice.minValue : null,
						max: filtros.sliderPrice ? filtros.sliderPrice.maxValue : null
					},
					immobile_bedroom: filtros.dormitorios,
					immobile_bathroom: filtros.banheiros,
					immobile_suite: filtros.suite,
					immobile_parking_spot: filtros.garagem
				};

				data = {
					json: 1,
					get_Address: true,
					get_District: true,
					get_City: true,
					get_UF: true,
					get_GalleryImage: true,
					limit: limit
				};
				
				$http({
					method: 'POST',
					url: URLS.root + 'api/immobile.php?module=getList',
					crossDomain: true,
					data: Object.assign(data, filters)
				}).then(function(immobileData) {
					var array = [ ];						
					
					angular.forEach(immobileData.data.data, function(item) {
						array.push(new Immobile(item));
					});

					deferred.resolve({info: immobileData.data.info, data: array});
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
			},

			loadLastOnes: function() {
				var deferred = $q.defer();
				
				$http({
					method: 'POST',
					url: URLS.root + 'api/immobile.php?module=getListNews',
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