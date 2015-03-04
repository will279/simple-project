'use strict';

module.exports = function(grunt) {
	
	grunt.initConfig({

		dir: {
			bower: 'bower_components',
			webapp: 'webapp'
		}
	// 1. Конфигурирование задач
		connect: {
	    	options: {
		        port: 8080,
		        hostname: 'localhost',
		        livereload: true
	    	},
	    	src: {},
		},

		openui5_connect: {
		    options: {
		        resources: [
		            'bower_components/openui5-sap.ui.core/resources',
		            'bower_components/openui5-sap.m/resources',
		            'bower_components/openui5-sap.ui.layout/resources',
		            'bower_components/openui5-themelib_sap_bluecrystal/resources'
		        ],
		        proxypath: 'proxy'
		    },
    		src: {
		        options: {
		            appresources: 'webapp'
		        }
    		},
		}
	})
	// 2. Загрузка задач
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-openui5');

	// 3. Регистрация задач (создание псевдонимов)
	grunt.registerTask('serve', [
			'openui5_connect:src:keepalive'
	]);

	grunt.registerTask('default', [
    	'serve'
    ]);
}