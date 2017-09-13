/**
 * Created by egmfilho on 17/01/17.
 */

'use strict';

angular.module('alabama.directives')
	.directive('card', ['$location', function($location) {

		function link(scope, element, attrs) {
			jQuery('[data-toggle="tooltip"]').tooltip();

			scope.customUrl = '/imovel?codigo=' + scope.code + '&nome=' + (scope.title + '-' + scope.subtitle).replace(/( - | )/g, '-');

			element.bind('click', function() {
				scope.$apply(function() {
					$location.search({});
					// $location.path('/imovel').search('codigo', scope.code).search('nome', (scope.title + '-' + scope.subtitle).replace(/( - | )/g, '-'));
				});
			});
		}

		function controller($scope, $timeout) {
			var timer, index = 0;

			$scope.currentPicture = function() {
				if ($scope.thumbs && $scope.thumbs.length) {
					return $scope.thumbs[index];
				} else if ($scope.picture) {
					return $scope.picture;
				}
			};
			
			$scope.onMouseEnter = function() {
				if (!$scope.thumbs || !$scope.thumbs.length)
					return;

				timer = $timeout(function() {
					index = (index + 1) % $scope.thumbs.length;
					$scope.onMouseEnter();
				}, !timer ? 500 : 2000);
			};

			$scope.onMouseLeave = function() {
				if (!timer) 
					return;

				$timeout.cancel(timer);
				timer = null;
				index = 0;
			}
		}

		controller.$inject = [ '$scope', '$timeout' ];

		return {
			restrict: 'E',
			templateUrl: 'partials/directives/card.html',
			scope: {
				code: '@',
				picture: '@',
				title: '@',
				subtitle: '@',
				description: '@',
				area: '@',
				price: '@',
				url: '@',
				bed: '@',
				suite: '@',
				bath: '@',
				parking: '@',
				labelText: '@',
				labelColor: '@',
				isHorizontal: '=',
				hideDescription: '=',
				category: '@',
				thumbs: '='
			},
			link: link,
			controller: controller
		}

	}]);
