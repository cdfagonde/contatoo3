// config/protractor.js

var config = require( './config' )();
var ptor;

exports.config = {
	sauceUser : config.sauceUser,
	sauceKey : config.sauceKey,
	capabilities : {
		'name' : config.sauceTestName,
		'browserName' : 'chrome',
		'tunnel-identifier' : config.travisJobNumber,
		'build' : config.travisBuild
	},

	specs : [
		'../test/e2e/**/*.js'
	],

	onPrepare : function() {
    	browser.ignoreSynchronization = false;
		// browser.driver.get( 'http://localhost:3000/#/auth' )
		browser.driver.get( 'http://localhost:3000' )   //  + config.port )
		.then( function() {
			browser.driver.findElement( by.id( 'entrar' )).click(); // Provocamos o click no link
			// Preenchemos mail e senha
			browser.driver.findElement( by.id( 'login_field' )).sendKeys( config.seleniumUser );
			browser.driver.findElement( by.id( 'password' )).sendKeys( config.seleniumUserPassword );
			browser.driver.findElement( by.name( 'commit' )).click(); // Botão com o submit
		});
	}
};