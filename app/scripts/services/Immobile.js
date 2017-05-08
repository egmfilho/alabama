'use strict';

angular.module('alabama.services')
	.factory('Immobile', ['$http', '$q', 'URLS', function($http, $q, URLS) {  

		var related = [ ];

		function Immobile(immobileData) {
			if (immobileData) {
				this.setData(immobileData);
				setPictures(this);
			}
			// Some other initializations related to Immobile
		}

		function setPictures(scope) {

			if (!scope.GalleryImage) {
				return;
			}

			angular.forEach(scope.GalleryImage, function(item, index) {
				item.url = URLS.root + 'files/immobile/' + item.immobile_id + '/' + item.gallery_image_id + '_large.jpg';
				item.thumb = URLS.root + 'files/immobile/' + item.immobile_id + '/' + item.gallery_image_id + '_small.jpg';
			});
		}

		function setRelated(array) {
			angular.forEach(array, function(item, index) {
				related.push(new Immobile(item));
			});			
		}

		Immobile.prototype = {
			setData: function(immobileData) {
				angular.extend(this, immobileData);
				this.immobile_value = parseInt(this.immobile_value); // para corrigir o preço de string pra int
				this.immobile_value_condominium = parseInt(this.immobile_value_condominium); // para corrigir o preço de string pra int
				this.immobile_value_iptu = parseInt(this.immobile_value_iptu); // para corrigir o preço de string pra int
			},
			get: function(code) {
				var scope = this, 
					deferred = $q.defer();

				$http({
					method: 'POST',
					url: URLS.root + 'api/immobile.php?module=get',
					crossDomain: true,
					data: {
						immobile_code: code,
						json: 1,
						get_Address: true,
						get_District: true,
						get_City: true,
						get_UF: true,
						get_GalleryImage: true,
						get_ImmobileCategory: true,
						group_feature: true
					}
				}).then(function(immobileData) {
					console.log(immobileData);
					scope.setData(immobileData.data.data);					
					setPictures(scope);
					if (immobileData.data.info.related) 
						setRelated(immobileData.data.info.related);					
					deferred.resolve();
				}, function(error) {
					console.log('deu erro: ' + error);
					deferred.reject(error);
				});

				return deferred.promise;
			},
			getMainPictureUrl: function() {
				if (!this.GalleryImage) {
					return;
				}

				for (var i = 0; i < this.GalleryImage.length; i++) {
					if (this.GalleryImage[i].gallery_image_main == 'Y') {
						return this.GalleryImage[i].url;
					}
				}

				return '';
			},
			getMainThumbUrl: function() {
				if (!this.GalleryImage) {
					return '';
				}

				for (var i = 0; i < this.GalleryImage.length; i++) {
					if (this.GalleryImage[i].gallery_image_main == 'Y') {
						return this.GalleryImage[i].thumb;
					}
				}

				return '';
			},
			convertToCardInfo: function() {
				return {
					code: this.immobile_code,
					picture: this.getMainThumbUrl(),
					pictureLg: this.getMainPictureUrl(),
					title: this.immobile_name,
					parsedName: this.immobile_name.replace(/ /g, '-'),
					subtitle: this.Address ? this.Address.District.district_name + ' - ' + this.Address.District.City.city_name : '',
					description: this.immobile_description || '',
					price: parseInt(this.immobile_value),
					url: this.url,
					bed: this.immobile_bedroom,
					suite: this.immobile_suite,
					bath: this.immobile_bathroom,
					parking: this.immobile_parking_spot,
					labelText: '',
					labelColor: '',
				};
			},

			getRelated: function() {
				return related;
			}
		};

		return Immobile;
	}]);