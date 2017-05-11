/**
 * Created by egmfilho on 17/01/17.
 */

'use strict';

angular.module('alabama.directives')
	.directive('watchHeight', [function() {

		function link(scope, element, attrs) {
			scope.$watch(function() {
				return element[0].offsetHeight;
			}, function() {
				scope.$emit('heightChange');
				console.log('emiting height change');
			});
		}

		return {
			link: link
		}

	}]);
