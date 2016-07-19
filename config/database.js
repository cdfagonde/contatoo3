// config/database.js
var mongoose = require( 'mongoose' );

// CDFagonde: vejamos que tul el debug
// mongoose.set('debug',true);

module.exports = function( uri ) {
	mongoose.connect( uri );
	// CDFagonde: para alterar o pool padrão de 5 conexões
	// mongoose.connect( uri, { server : { poolSize : 15 }});

	mongoose.connection.on( 'connected', function() {
		console.log ( 'Mongoose! Conectado em ' + uri );
	});

	mongoose.connection.on( 'disconnected', function() {
		console.log( 'Mongoose! Desconectado de ' + uri );
	});

	mongoose.connection.on( 'error', function( erro ) {
		console.log( 'Mongoose! Erro na conexão: ' + erro );
	});

	// CDFagonde: fechamos a conexão na saida
	process.on( 'SIGINT', function() {
		mongoose.connection.close( function() {
			console.log( 'Mongoose! Desconectado pelo término da aplicação' );
			// 0 indica que a finalização ocorreu sem erros
			process.exit( 0 );
		});
	});
}