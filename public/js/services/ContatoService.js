// public/js/services/ContatoService.js

angular.module('contatoo2').factory('Contato', function( $resource ) {
	return $resource('/contatos/:id');
});