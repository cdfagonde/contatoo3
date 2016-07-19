// contatoo2/consulta.js

var MongoClient = require( 'mongodb' ).MongoClient;
var ObjectID = require( 'mongodb' ).ObjectID;

// ObjectID de algum contato existente
// var _idProcurado = new ObjectID( '53ee689e89bd201218944bba' );
var _idProcurado = new ObjectID( '5764bb0813a0a7230492bc0d' );

MongoClient.connect( 'mongodb://localhost:27017/contatoo2',
	function( erro, db ) {
		if ( erro ) throw err;
		db.collection( 'contatos' ).findOne({ _id : _idProcurado },
			function( erro, contato ) {
				if ( erro ) throw err;
				console.log( contato );
			}
		);
	}
);