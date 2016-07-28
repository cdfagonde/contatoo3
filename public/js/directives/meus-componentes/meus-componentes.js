// public/js/directives/meus-componentes/meus-componentes.js

angular.module( 'meusComponentes', [])
.directive( 'meuPainel', function() {
	var directive = {};

	directive.restrict = "EA";   // Poderemos usar como Elemento ou Atributo

	directive.scope = {
		titulo : '@'
	};

	directive.transclude = true;

	// Vamos definir o template num arquivo separado..
	// directive.template =
	// 	'<div class="panel panel-default">' +
	// 	' <div class="panel-heading">' +
	// 	'  <h3 class="panel-title">{{titulo}}</h3>' +
	// 	' </div>' +
	// 	' <div ng-transclude class="panel-body">' +
	// 	' </div>' +
	// 	'</div>';
	directive.templateUrl = 'js/directives/meus-componentes/meu-painel.html';

	return directive;
})

.directive( 'meuBotaoAviso', function() {
	var directive = {};

	directive. restrict = 'E';

	directive.scope = {
		nome : '@',
		acao : '&'
	};

	directive.template = '<button ng-click="acao()" class="btn btn-warning"> {{nome}} </button>';

	return directive;
})

.directive( 'meuFocus', function() {
	var directive = {};

	directive.restrict = 'A';   // meu-focus será usado somente como atributo

	directive.scope = { evento : '@' };

	directive.link = function( scope, element ) {
		// Trocamos $watch por evento
		// scope.$watch( 'focus', function() {
		// if ( scope.focus ) {
		// 		element[ 0 ].focus();
		// 		scope.focus = false;
		// 	}
		// });
		scope.$on( scope.evento, function() {
			element[ 0 ].focus();
		});

	};

	return directive;
});