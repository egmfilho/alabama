/**
 * Created by egmfilho on 18/01/17.
 */

'use strict';

angular.module('alabama.controllers')
	.controller('ImovelCtrl', ImovelCtrl);

ImovelCtrl.$inject = [ '$rootScope', '$scope', '$location', '$window', 'Immobile', 'Lightbox'];

function ImovelCtrl($rootScope, $scope, $location, $window, Immobile, Lightbox) {

	var self = this;	

	$scope.$on('$viewContentLoaded', function () {
		self.currentSlide = 0;

		self.isXS = $window.innerWidth < 768;

		$scope.immobile = new Immobile();
		if ($location.search()['codigo']) {
			$rootScope.loading.load();
			$scope.immobile.get($location.search()['codigo']).then(function(success) {
				self.ready = true;
				$rootScope.loading.unload();
				// teste();
			});
		}
	});

	function teste() {
		console.log($scope.immobile);
		var image = 'http://lorempixel.com/1280/800/nature/';
		$scope.immobile.GalleryImage = [
			{ "url": image + '1', "thumb": image + '1'},
			{ "url": image + '2', "thumb": image + '2'},
			{ "url": image + '3', "thumb": image + '3'},
			{ "url": image + '4', "thumb": image + '4'},
			{ "url": image + '5', "thumb": image + '5'},
			{ "url": image + '6', "thumb": image + '6'},
			{ "url": image + '7', "thumb": image + '7'},
			{ "url": image + '8', "thumb": image + '8'},
			{ "url": image + '9', "thumb": image + '9'}
		];
	}

	$scope.openLightbox = function() {
		var images = [];
		angular.forEach($scope.immobile.GalleryImage, function(item) {
			images.push(item.url);
		});
		console.log('oppening lightbox on index: ' + self.currentSlide);
		Lightbox.openModal(images, self.currentSlide || 0);
	};

	this.responsive1 = [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2
			}
		}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	];

	this.responsive2 = [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 7
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 5
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3
			}
		}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	];

}
