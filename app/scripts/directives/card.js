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
					$location.search({});
					$location.path('/imovel').search('codigo', scope.code).search('nome', (scope.title + '-' + scope.subtitle).replace(/( - | )/g, '-'));
				});
			});
		}

		return {
			restrict: 'E',
			templateUrl: 'partials/directives/card.html',
			scope: {
				code: '@',
				picture: '@',
				title: '@',
				subtitle: '@',
				description: '@',
				price: '@',
				url: '@',
				bed: '@',
				suite: '@',
				bath: '@',
				parking: '@',
				labelText: '@',
				labelColor: '@',
				isHorizontal: '=',
				hideDescription: '='
			},
			link: link
		}

	}]);
