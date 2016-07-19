// config/protractor.js

exports.config = {
	specs : [
		'../test/e2e/**/*.js'
	],

	chromeOnly: true,
	directConnect: true,

	onPrepare : function() {
		browser.driver.get( 'http://localhost:3000' )
		.then( function() {
			// Provocamos o click no link
			browser.driver.findElement( by.id( 'entrar' )).click();
			// Preenchemos mail e senha
			browser.driver.findElement( by.id( 'login_field' )).sendKeys( 'cdfagonde@hotmail.com' );
			browser.driver.findElement( by.id( 'password' )).sendKeys( 'D@niel1969' );
			// Botão com o submit
			browser.driver.findElement( by.name( 'commit' )).click();
		});
	}
};