// modelo1
// 	header1
// 	home
// 		carousel
// 	sobre
// 	imoveis
// 		imovel1

// modelo2
// 	header2
// 	home
// 		carousel
// 	sobre
// 	imoveis
// 		imovel1

// modelo3
// 	header3	

// modelo4
// 	header4


'use strict';

angular.module('alabama.constants', [ ]);
angular.module('alabama.controllers', [ ]);
angular.module('alabama.filters', [ ]);
angular.module('alabama.directives', [ ]);
angular.module('alabama.services', [ ]);

angular.module('alabama', [
		'alabama.constants',
		'alabama.controllers',
		'alabama.filters',
		'alabama.directives',
		'alabama.services',
		'ngAnimate',
		'ngRoute',
		'ngSanitize',
		'ngTouch',	
		'slick',
		'rzModule',
		'ngMap',
		'bootstrapLightbox'
	])
	.config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {
		$httpProvider.interceptors.push('HttpInterceptor');
		$locationProvider.hashPrefix('');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}])
	.config(['LightboxProvider', function(LightboxProvider) {
		LightboxProvider.fullScreenMode = true;
		LightboxProvider.templateUrl = 'partials/lightbox.html';
	}])
	.config(['$routeProvider', function($routeProvider) {

		var genericController = ['$rootScope', 'ImmobileManager', function ($rootScope, ImmobileManager) {
			var self = this;
			self.array = [];
			$rootScope.loading.load();
			ImmobileManager.loadMostVisited().then(function(success) {
				angular.forEach(success, function(item) {			
					self.array.push(item.convertToCardInfo());
				});
				$rootScope.loading.unload();
			}, function(error) {
				$rootScope.loading.unload();
			});	
		}];

		$routeProvider
		.when('/', {
			name: 'home',
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'
		})
		.when('/sobre', {
			name: 'sobre',
			templateUrl: 'views/sobre.html',
			controller: genericController,
			controllerAs: 'sobre'
		})
		.when('/imoveis', {
			name: 'imoveis',
			templateUrl: 'views/imoveis.html',
			controller: 'ImoveisCtrl',
			controllerAs: 'imoveis'
		})
		.when('/imovel', {			
			templateUrl: 'views/imovel.html',
			controller: 'ImovelCtrl',
			controllerAs: 'imovel'
		})
		.when('/equipe', {
			name: 'equipe',
			templateUrl: 'views/equipe.html',
			controller: genericController,
			controllerAs: 'equipe'
		})
		.when('/contato', {
			name: 'contato',
			templateUrl: 'views/contato.html',
			controller: 'ContatoCtrl',
			controllerAs: 'contato'
		})
		.otherwise({
			redirectTo: '/'
		});

	}])
	.run(['$rootScope', '$location', '$window', '$timeout', function($rootScope, $location, $window, $timeout) {

		$rootScope.loading = {
			count: 0,
			isLoading: function() { return this.count > 0 },
			load: function() { this.count++; },
			unload: function() { this.count--; this.count < 0 ? this.count = 0 : null }
		};

		// Prevent scroll while loading screen is on
		jQuery('#loading').bind('touchmove mousewheel DOMMouseScroll', function(e) {
			e.preventDefault();
		});

		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			$rootScope.currentPath = $location.path();
			jQuery('.bootstrap-select.open button').dropdown('toggle');
		});

		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
			var header = jQuery('#header');

			if (!previous || !previous.name) {
				jQuery(header).find('ul.nav li').removeClass('active');
			} else {
				jQuery(header).find('ul.nav li[name="' + previous.name + '"]').removeClass('active');
			}
			jQuery(header).find('ul.nav li[name="' + current.name + '"]').addClass('active');
		});

		$rootScope.startBootstrapSelect = function() {
			jQuery('select').selectpicker();
		};

		$rootScope.setCarouselInterval = function(selector, interval) {
			jQuery(selector).carousel({
				interval: interval
			});
		};

		$rootScope.getNumber = function(num) {
			return new Array(Math.max(0, Math.ceil(num)));
		};

		$window.onscroll = function() {
			$rootScope.scrollY = $window.scrollY;
			$rootScope.$apply();
		};

		$rootScope.scrollTop = function(y, delay) {
			if ($rootScope.scrollY >= 100) {
				jQuery('body').animate({ scrollTop: (y || 0) }, delay || 500);
			}
		}

	}]);