'use strict';

angular.module('alabama.services')
	.factory('Immobile', ['$http', '$q', 'URLS', function($http, $q, URLS) {  

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

		Immobile.prototype = {
			setData: function(immobileData) {
				angular.extend(this, immobileData);
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
					scope.setData(immobileData.data.data);
					setPictures(scope);
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
			}
		};

		return Immobile;
	}]);