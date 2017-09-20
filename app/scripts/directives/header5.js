
(function() {

	'use strict';

	angular.module('alabama.directives')
		.directive('header5', ['$rootScope', function($rootScope) {

			function controller($scope, $filter) {

				jQuery('.header5 #carousel-showcase').carousel({
					pause: null,
					interval: 5000
				});
			
				this.toggleHeader5Mobile = function() {
					if (jQuery('.header5-mobile').css('display') == 'none') {
						this.showHeader5Mobile();
					} else {
						this.showHeader5Mobile();
					}
				};
			
				this.showHeader5Mobile = function() {
					jQuery('.header5-mobile').fadeIn(250);
				};
			
				this.hideHeader5Mobile = function() {
					jQuery('.header5-mobile').fadeOut(250);
				};
			
				jQuery('.header5-mobile').bind('touchmove mousewheel DOMMouseScroll', function(e) {
					e.preventDefault();
				});
			
				this.getCurrentPath = function() {
					return $rootScope.currentPath;
				};
			}

			controller.$inject = [ '$scope', '$filter' ];

			return {
				restrict: 'E',
				templateUrl: 'partials/directives/header5.html',
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