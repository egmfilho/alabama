/**
 * Created by egmfilho on 20/01/17.
 */

'use strict';

angular.module('alabama.controllers')
	.controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = [ '$scope', '$filter', 'ImmobileManager' ];

function HeaderCtrl($scope, $filter, ImmobileManager) {

	$scope.featuredList = [];

	$scope.getFeaturedList = function() {
		$scope.featuredList = [];
		ImmobileManager.loadAllFeatured().then(function(success) {
			angular.forEach(success, function(item) {			
				$scope.featuredList.push(item.convertToCardInfo());
			});
			console.log($scope.featuredList);
		}, function(error) {
			console.log(error);
		});
	}

}