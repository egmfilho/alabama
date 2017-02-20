/**
 * Created by egmfilho on 16/02/17.
 */

'use strict';

angular.module('alabama.directives')
	.directive('cardCarousel', ['$window', '$timeout', function($window, $timeout) {

		function chunkArray(array, groupsize) {
			var clone = array.slice(0), sets = [], chunks, i = 0;
		    chunks = clone.length / groupsize;

		    while(i < chunks){
		        sets[i] = clone.splice(0, groupsize);
				i++;
		    }

			return sets;
		}

		function link(scope, element, attrs) {
			
			function setCarouselInterval() {
				var carouselElem = jQuery('#' + scope.cardCarouselId);

				if(carouselElem.length) {
					carouselElem.carousel({
						interval: scope.cardCarouselInterval
					});
				} else {
					$timeout(setCarouselInterval, 100);
				}
			}
			
			if (scope.cardCarouselInterval) {
				$timeout(setCarouselInterval, 100);
			}
			

			$window.addEventListener('resize', onWindowResize);			
			function onWindowResize() {
				var width = $window.innerWidth;

				if (!scope.currentWidthRange) {
					scope.currentWidthRange = '';
				}

				if (width < 768) {
					if (scope.currentWidthRange != 'xs') {
						scope.blocks = chunkArray(scope.cardCarouselArray, 1);
						scope.currentWidthRange = 'xs';
						jQuery('#' + scope.cardCarouselId).carousel();
					}
				} else if (width < 992) {
					if (scope.currentWidthRange != 'sm') {
						scope.blocks = chunkArray(scope.cardCarouselArray, 2);
						scope.currentWidthRange = 'sm';
						jQuery('#' + scope.cardCarouselId).carousel();
					}
				} else if (width < 1200) {
					if (scope.currentWidthRange != 'md') {
						scope.blocks = chunkArray(scope.cardCarouselArray, 3);
						scope.currentWidthRange = 'md';
						jQuery('#' + scope.cardCarouselId).carousel();
					}
				} else if (width >= 1200) {
					if (scope.currentWidthRange != 'lg') {
						scope.blocks = chunkArray(scope.cardCarouselArray, 3);
						scope.currentWidthRange = 'lg';
						jQuery('#' + scope.cardCarouselId).carousel();
					}
				}

			}
			onWindowResize();
		}

		return {
			restrict: 'E',
			templateUrl: 'partials/directives/card-carousel.html',
			scope: {				
				cardCarouselId: '@carouselId',
				cardCarouselName: '@name',
				cardCarouselInterval: '@interval',
				cardCarouselArray: '=cards'
			},
			link: link
		}

	}]);