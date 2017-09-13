/**
 * Created by egmfilho on 18/01/17.
 */

'use strict';

angular.module('alabama.controllers')
	.controller('ImovelCtrl', ImovelCtrl);

ImovelCtrl.$inject = [ '$rootScope', '$scope', '$location', '$window', '$http', '$timeout', 'Immobile', 'Lightbox', 'SearchFilters'];

function ImovelCtrl($rootScope, $scope, $location, $window, $http, $timeout, Immobile, Lightbox, SearchFilters) {

	var self = this;

	this.related = [ ];

	self.interest = {
		immobile_id: null,
		immobile_name: null,
		nome: 'caboclo',
		telefone: null,
		email: null,
		mensagem: null
	};

	$scope.$on('$viewContentLoaded', function () {
		$timeout(function() {
			$scope.$broadcast('updateFilters', SearchFilters.get());
		}, 200);

		self.currentSlide = 0;

		self.isXS = $window.innerWidth < 768;

		$scope.immobile = new Immobile();
		if ($location.search()['codigo']) {
			$rootScope.loading.load();
			$scope.immobile.get($location.search()['codigo']).then(function(success) {
				self.ready = true;

				angular.forEach($scope.immobile.getRelated(), function(item, index) {
					self.related.push(item.convertToCardInfo());
				});
				self.interest.immobile_id = $scope.immobile.immobile_id;
				self.interest.immobile_name = $scope.immobile.immobile_code + ' - ' + $scope.immobile.immobile_name;
				self.interest.mensagem = 'Tenho interesse no imóvel (' + $scope.immobile.immobile_code + ') ' + $scope.immobile.immobile_name + ' em ' + $scope.immobile.Address.District.City.city_name;
				$rootScope.loading.unload();
			});
		}
	});

	$scope.openLightbox = function(index) {
		self.currentSlide = index || 0;

		if ($window.innerWidth < 768) return;

		var images = [];
		angular.forEach($scope.immobile.GalleryImage, function(item) {
			images.push(item.url);
		});
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

	$scope.submitForm = function() {
		$http({
			url: './external/mail.php',
			method: 'POST',
			data: self.interest
		}).then(function(success) {
			alert('formulario enviado');
		}, function(error) {
			alert('formulario nao enviado');
		});
	};

	$scope.carouselPrev = function() {
		jQuery('#immobile-pictures-xs').carousel('prev');
	};

	$scope.carouselNext = function() {
		jQuery('#immobile-pictures-xs').carousel('next');
	};
}
