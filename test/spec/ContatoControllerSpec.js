// contatoo2/test/spec/ContatoControllerSpec.js

describe( "ContatoController" , function () {

	var $scope, $httpBackend;

	// Preparamos mock
	beforeEach( function() {
		module( 'contatoo2' );
		inject( function( $injector, _$httpBackend_ ) {
			$scope = $injector.get( '$rootScope' ).$new();
			$httpBackend = _$httpBackend_;
			$httpBackend.when( 'GET', '/contatos/1' ).respond({ _id : '1' });
			$httpBackend.when( 'GET', '/contatos' ).respond([{}]);
		});
	});

	// Usaremos inject() para poder acessar controllers dentro de nossos testes..
	it( "Deve criar um Contato vazio quando nenhum parâmetro de rota for passado",
		inject( function( $controller ) {
			// Serviço $controller do angular-mocks, permite injetar controllers
			$controller( 'ContatoController', { "$scope" : $scope });
			expect( $scope.contato._id ).toBeUndefined();
		})
	);


	// 
	it( "Deve preencher o Contato quando parâmetro de rota for passado",
		inject( function( $controller ) {
			$controller( 'ContatoController', {
				'$routeParams' : { contatoId : 1 },
				'$scope' : $scope
			});
			$httpBackend.flush();
			expect( $scope.contato._id ).toBeDefined();
		})
	);

});