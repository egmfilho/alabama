'use strict';

angular.module('alabama.controllers')
	.controller('ImoveisCtrl', ImoveisCtrl);

ImoveisCtrl.$inject = ['$rootScope', '$scope', 'ImmobileManager'];

function ImoveisCtrl($rootScope, $scope, ImmobileManager) {

	var self = this;

	this.cardList = [];

	$scope.$on('$viewContentLoaded', function() {
		$rootScope.startBootstrapSelect();
		getCardList();
	});

	function getCardList() {
		self.cardList = [];
		ImmobileManager.loadAllImmobiles().then(function(success) {
			console.log(success);
			angular.forEach(success, function(item) {
				console.log(parseInt(item.immobile_value));
				self.cardList.push({
					code: item.immobile_code,
					picture: item.getMainThumbUrl(),
					title: item.immobile_name,
					subtitle: item.Address.District.district_name + ' - ' + item.Address.District.City.city_name,
					description: item.immobile_description,
					price: parseInt(item.immobile_value),
					url: item.url,
					bed: item.immobile_bedroom,
					suite: item.immobile_suite,
					bath: item.immobile_bathroom,
					parking: item.immobile_parking_spot,
					labelText: '',
					labelColor: '',
				});
			});
		}, function(error) {
			console.log(error);
		});
	}
}