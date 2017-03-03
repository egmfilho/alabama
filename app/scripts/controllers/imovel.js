/**
 * Created by egmfilho on 18/01/17.
 */

'use strict';

angular.module('alabama.controllers')
	.controller('ImovelCtrl', ImovelCtrl);

ImovelCtrl.$inject = [ '$rootScope', '$scope', '$location', 'Immobile', 'Lightbox'];

function ImovelCtrl($rootScope, $scope, $location, Immobile, Lightbox) {

	var self = this;

	$scope.$on('$viewContentLoaded', function () {
		self.currentSlide = 0;

		$scope.immobile = new Immobile();
		if ($location.search()['codigo']) {
			$scope.immobile.get($location.search()['codigo']).then(function(success) {
				self.ready = true;
			});
		}
	});

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

}
