
(function() {

	'use strict';

	angular.module('alabama.directives')
		.directive('header3', ['$rootScope', function($rootScope) {

			function controller($scope, $filter) {

				jQuery('.header3 #carousel-showcase').carousel({
					pause: null,
					interval: 5000
				});
			
				this.toggleHeader3Mobile = function() {
					if (jQuery('.header3-mobile').css('display') == 'none') {
						this.showHeader3Mobile();
					} else {
						this.showHeader3Mobile();
					}
				};
			
				this.showHeader3Mobile = function() {
					jQuery('.header3-mobile').fadeIn(250);
				};
			
				this.hideHeader3Mobile = function() {
					jQuery('.header3-mobile').fadeOut(250);
				};
			
				jQuery('.header3-mobile').bind('touchmove mousewheel DOMMouseScroll', function(e) {
					e.preventDefault();
				});
			
				this.getCurrentPath = function() {
					return $rootScope.currentPath;
				};
			}

			controller.$inject = [ '$scope', '$filter' ];

			return {
				restrict: 'E',
				templateUrl: 'partials/directives/header3.html',
				scope: {
					navigation: '@',
					whatsapp: '@',
					tel: '@',
					email: '@',
					title: '@',
					subtitle: '@',
					message: '@',
					btnLabel: '@'
				},
				link: function(scope, elem, attrs) {
					scope.navButtons = JSON.parse(scope.navigation);
				},
				controller: controller,
				controllerAs: 'header',
			}

		}]);

}());