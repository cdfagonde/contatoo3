// public/js/main.js

angular.module( 'contatoo2', [ 'ngRoute', 'ngResource', 'meusComponentes' ])
.config( function( $routeProvider , $httpProvider ) {

	$httpProvider.interceptors.push( 'meuInterceptor' );

	$routeProvider
	.when( '/auth', {
		templateUrl : 'partials/auth.html'
	});

	$routeProvider
	.when( '/contatos', {
		templateUrl : 'partials/contatos.html',
		controller : 'ContatosController'
	});

	$routeProvider
	.when( '/contato/:contatoId', {
		templateUrl : 'partials/contato.html',
		controller : 'ContatoController'
	});

	// Rota para um novo contato
	$routeProvider
	.when( '/contato', {
		templateUrl : 'partials/contato.html',
		controller : 'ContatoController'
	});

	// Rota default
	$routeProvider.otherwise({ redirectTo : '/contatos' });
});