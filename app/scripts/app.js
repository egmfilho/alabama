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
				console.log(self.array);
			}, function(error) {
				console.log(error);
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
	.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {

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

	}])
	.run(['$rootScope', function($rootScope) {
		$rootScope.root_imoveis = [{
			picture: '../images/pictures/0.png',
			title: 'Estação Lunar',
			subtitle: 'Lua - Sistema Solar',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla massa, faucibus ut urna a, dignissim tincidunt nisi. Nullam tincidunt vitae urna vel porta. Pellentesque viverra hendrerit interdum.',
			price: 23000000,
			url: '/imovel',
			labelText: 'Em construção',
			labelColor: '#00aa70'
		}, {
			picture: '../images/pictures/1.jpg',
			title: 'Casa Assombrada',
			subtitle: 'Teresópolis - Rio de Janeiro',
			description: 'Etiam pharetra diam non lobortis tempus. Nunc consectetur in ex eu sagittis. In suscipit nunc et erat interdum, a sodales purus pretium. Vivamus ultricies porta libero vitae ullamcorper.',
			price: 34000,
			url: '/imovel',
			labelText: '50% OFF',
			labelColor: ''
		}, {
			picture: '../images/pictures/2.jpg',
			title: 'Barraco Maroto',
			subtitle: 'Teresópolis - Rio de Janeiro',
			description: 'Quisque id aliquam neque. Nulla mollis dolor at tincidunt pulvinar. Sed commodo in lacus quis viverra. Morbi volutpat arcu nec sapien blandit bibendum.',
			price: 15000,
			url: '/imovel',
			labelText: '',
			labelColor: ''
		}, {
			picture: '../images/pictures/3.png',
			title: 'Castelo Secreto',
			subtitle: 'Localização Confidencial',
			description: 'Fusce et mauris lacinia, congue nunc sit amet, convallis libero. In id placerat nisl, a aliquet erat. Donec ornare felis in leo euismod, dapibus porttitor justo ullamcorper.',
			price: 1500000,
			url: '/imovel',
			labelText: '',
			labelColor: ''
		}, {
			picture: '../images/pictures/4.png',
			title: 'Estação Órbital Mars II',
			subtitle: 'Órbita de Marte - Sistema Solar',
			description: 'Fusce eget volutpat neque. Vivamus blandit turpis ac rutrum auctor. Nullam molestie nulla eu laoreet rhoncus. Donec commodo magna id mi vulputate, non dignissim lacus gravida.',
			price: 3000000,
			url: '/imovel',
			labelText: '',
			labelColor: ''
		}, {
			picture: '../images/pictures/5.png',
			title: 'Usina Nuclear',
			subtitle: 'Angra dos Reis - Rio de Janeiro',
			description: 'Aenean sit amet ornare est. Maecenas venenatis, turpis vel mollis mollis, mi enim consectetur erat, vel fermentum nulla erat eget velit.',
			price: 90000000,
			url: '/imovel',
			labelText: 'Imperdível',
			labelColor: ''
		}];
	}]);