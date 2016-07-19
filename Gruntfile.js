// contatoo2/Gruntfile.js

module.exports = function( grunt ) {

	grunt.initConfig({
		copy : {
			project : {
				expand : true,
				cwd : '.',
				src :
				[
					'**',
					'!Gruntfile.js', '!package.json', '!bower.json' ],
				dest : 'dist'
			}
		},

		clean : {
			dist : {
				src : 'dist'
			}
		},

		usemin : {
			html : 'dist/app/views/**/*.ejs'
		},

		useminPrepare : {
			options : {
				root : 'dist/public',
				dest : 'dist/public'
			},
			html : 'dist/app/views/**/*.ejs'
		},

		ngAnnotate : {
			scripts : {
				expand : true,
				src : [ 'dist/public/js/**/*.js' ]
			}
		}
	});

	// Tarefa default, executada pelo comando grunt sem parametros
	grunt.registerTask( 'default', [ 'dist' , 'minificar' ]);

	// Tarefa para backup na nossa pasta 'dist', primeiro limpa tudp, e depois copia
	grunt.registerTask( 'dist', [ 'clean', 'copy' ]);

	// Tarefa que executa a minificação de tudo
	grunt.registerTask( 'minificar', [
		'useminPrepare',
		'ngAnnotate',
		'concat',
		'uglify',
		'cssmin',
		'usemin'
	]);

	// Agora os plug-ins que vamos usar
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	//
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	//
	grunt.loadNpmTasks( 'grunt-usemin' );
	//
	grunt.loadNpmTasks( 'grunt-ng-annotate' );

};