// contatoo2/server.js

var http = require( 'http' );
var express = require( 'express' );
var app = require( './config/express' )();
require( './config/passport' )();
require( './config/database.js' )('mongodb://localhost/contatoo2');

http.createServer( app ).listen( app.get( 'port' ), function (){
	console.log( new Date());
	console.log( 'Express Server escutando na porta ' + app.get( 'port' ));
});