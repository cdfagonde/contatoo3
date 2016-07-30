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

	seleniumAddress: 'http://localhost:4444/wd/hub',

	allScriptsTimeout: 55000,

	specs : [
		'../test/e2e/**/*.js'
	],

	chromeOnly: true,
	directConnect: true,

	onPrepare : function() {

    	browser.ignoreSynchronization = true;  // <-- to proceed beyond splash screen
		browser.driver.get( 'http://localhost:3000' )
		.then( function() {
			// Provocamos o click no link
			browser.driver.findElement( by.id( 'entrar' )).click();
			// Preenchemos mail e senha
			browser.driver.findElement( by.id( 'login_field' )).sendKeys( config.seleniumUser );
			browser.driver.findElement( by.id( 'password' )).sendKeys( config.seleniumUserPassword );
			// Botão com o submit
			browser.driver.findElement( by.name( 'commit' )).click();
		});
	}
};