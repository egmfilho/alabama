/**
 * Created by egmfilho on 17/01/17.
 */

'use strict';

angular.module('alabama.directives')
	.directive('card', ['$location', function($location) {

		function link(scope, element, attrs) {
			jQuery('[data-toggle="tooltip"]').tooltip();

			element.bind('click', function() {
				scope.$apply(function() {
					$location.path(scope.url);
				});
			});
		}

		return {
			restrict: 'E',
			templateUrl: 'partials/directives/card.html',
			scope: {
				picture: '@',
				title: '@',
				subtitle: '@',
				description: '@',
				price: '@',
				url: '@',
				labelText: '@',
				labelColor: '@',
				isHorizontal: '=',
				hideDescription: '='
			},
			link: link
		}

	}]);
