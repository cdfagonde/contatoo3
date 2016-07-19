// app/routes/index.js

module.exports = function( app ) {
	app.get( '/', function( req, res ) {
		var usuarioConectado = '';
		if ( req.user ) {
			usuarioConectado = req.user.login;
		}
		res.render( 'index', { 
			"usuario" : usuarioConectado
		});
	});
};