// config/express.js

var load = require( 'express-load' );
var bodyParser = require( 'body-parser' );
var cookieParser = require( 'cookie-parser' );
var session = require( 'express-session' );
var passport = require( 'passport' );
var express = require( 'express' );

// Incluindo o Helmet
helmet = require ( 'helmet' );

// Com a entrada do express-load, a linha a seguir não é mais necessária
// var home = require( '../app/routes/home' );

module.exports = function() {
	var app = express();

	// configuração de ambiente
	app.set( 'port', 3000 );

	// configuração do ejs usando variáveis de ambiente
	app.set( 'view engine', 'ejs' );    // ejs será nosso view engine
	app.set( 'views', './app/views' );  // local das nossas views

	// middleware do bodyparser, que permite a sobrecarga de metodos, como delete ou put
	app.use( bodyParser.urlencoded({ extended : true }));
	app.use( bodyParser.json());
	app.use( require( 'method-override' )());

	// middleware, permitindo acesso à pasta public
	app.use( express.static( './public' ));

	// Preparação do Passport
	app.use( cookieParser());
	app.use( session(
		{
			secret : 'homem avestruz',
			resave : true,
			saveUninitialized : true
		}
	));
	app.use( passport.initialize());
	app.use( passport.session());

	// Habilitando somente os middlewares do helmet que nos interessam
	app.use( helmet.xframe());   // Evitamos que a página seja invocada dentro de um frame ou iframe
	app.use( helmet.xssFilter());   // Adicionando header htpp X-XSS-Protection
	app.use( helmet.nosniff());   // Não permitir links ou script com mime dif. de text/css ou text/javascript
	app.disable( 'x-powered-by' );   // Ocultamos o powered by
	// app.use( helmet.hidePoweredBy({ setTo : 'PHP 5.5.14' }));   // Informamos php

	// Com express-load, a função home() foi substituida pela função load()..
	// home( app );
	load( 'models', { cwd : 'app' })
		.then( 'controllers' )
		.then( 'routes' )
		.then( 'routes/auth.js' )
		.into( app );

	// se nenhum rota atender, direciona para página 404
	app.get( '*' , function( req , res ) {
		res.status( 404 ).render( '404' );
	});

	// 
	return app;
};