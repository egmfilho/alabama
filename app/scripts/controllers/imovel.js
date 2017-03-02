/**
 * Created by egmfilho on 18/01/17.
 */

'use strict';

angular.module('alabama.controllers')
	.controller('ImovelCtrl', ImovelCtrl);

ImovelCtrl.$inject = [ '$rootScope', '$scope', '$location', '$timeout', 'Immobile'];

function ImovelCtrl($rootScope, $scope, $location, $timeout, Immobile) {

	var self = this;

	$scope.$on('$viewContentLoaded', function () {
		// $timeout(function() {
		// 	console.log('ready');
		// 	self.ready = true;
		// }, 1000);

		$scope.immobile = new Immobile();
		if ($location.search()['codigo']) {
			$scope.immobile.get($location.search()['codigo']).then(function(success) {
				self.ready = true;
			});
		}
	});

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
