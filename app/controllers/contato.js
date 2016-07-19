// app/controllers/contato.js

// mongo-sanitize é usado para prevenir injection. Ele remove
// qualquer $ que seja passado que esteja contido no valor 'sanitizado'
var sanitize = require( 'mongo-sanitize' );

module.exports = function( app ) {

	var Contato = app.models.contato;

	var controller = {};

    // Lista de contatos
	controller.listaContatos = function( req, res ) {
		var promise = Contato.find()
		// .select( "nome email" )   // CDFagonde: isto permite selecionar esses 2 campos
		// .where( "email" ).equals( /cont/ )   // Isto permite filtrar
		.populate( 'emergencia' )
		.exec()
		.then(
			// Callback de sucesso
			function( contatos ) {
				res.json( contatos );
			},
			// Callback de erro
			function( erro ) {
				console.error( erro );
				res.status( 500 ).json( erro );
			}
		);
	};

	// Pesquisar um contato
	controller.obtemContato = function( req, res ) {
		var _id = req.params.id;
		Contato.findById( _id )
		.exec()
		.then(
			function( contato ) {
				if ( !contato ) throw new Error( "Contato não encontrado" );
				res.json( contato );
			},
			function( erro ) {
				console.log( erro );
				res.status( 404 ).json( erro );
			}
		);
	};

	// Escluir um contato
	controller.removeContato = function( req, res ) {
		// Vamos 'sanitizar' o valor antes de montar nosso critério para exclusão
		// var _id = req.params.id;
		var _id = sanitize( req.params.id );
		Contato.remove({ "_id" : _id })
		.exec()
		.then(
			function() {
				res.status( 204 ).end();
			},
			function( erro ) {
				return console.error( erro );
			}
		);
	};

	// Salvar um documento (insert ou update)
	controller.salvaContato = function( req, res ) {
		var _id = req.body._id;

		/* 
			Independente da quantidade de parâmetros,
			apenas selecionamos o nome, email e emergencia:
		*/
		var dados = {
			"nome" : req.body.nome,
			"email" : req.body.email,
			"emergencia" : req.body.emergencia || null
		};
		// // testando por undefined
		// req.body.emergencia = req.body.emergencia || null;
		// // CDFagonde: Deveriamos ter problemas sem isto, mas não ocorreu!

		if ( _id ) {
			// Vamos atualizar o contato
			Contato.findByIdAndUpdate( _id, dados )
			.exec()
			.then(
				function( contato ) {
					res.json( contato );
				},
				function( erro ) {
					console.error( erro );
					res.status( 500 ).json( erro );
				}
			);
		} else {
			// Vamos criar um novo contato
			Contato.create( dados )
			.then(
				function( contato ) {
					res.status( 201 ).json( contato );
				},
				function( erro ) {
					console.log( erro );
					res.status( 500 ).json( erro );
				}
			);
		}
	};

	return controller;
};