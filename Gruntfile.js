'use strict';

module.exports = function(grunt) {
	
	grunt.initConfig({

		dir: {
			bower_components: 'bower_components', // Директория установки bower компонентов
			webapp: 'webapp'					  // Директория с исходным кодом приложения
		}
	// 1. Конфигурирование задач
		connect: {
	    	options: {
		        port: 8080, 					  // Порт на котором будет доступен веб-сервер
		        hostname: 'localhost',			  // Хост который будет использовать веб-сервер
		        livereload: true				  // Активация livereload
	    	},
	    	src: {},
		},

		openui5_connect: {
		    options: {
		        resources: [					 // Путь к библиотекам OpenUI5
		            '<%= dir.bower_components %>/openui5-sap.ui.core/resources',
		            '<%= dir.bower_components %>/openui5-sap.m/resources',
		            '<%= dir.bower_components %>/openui5-sap.ui.layout/resources',
		            '<%= dir.bower_components %>/openui5-themelib_sap_bluecrystal/resources'
		        ],
		        proxypath: 'proxy'				// Префикс сетевого адреса для передачи запроса через proxy-сервер
		    },
    		src: {
		        options: {
		            appresources: '<%= dir.webapp %>'      // Директория с файлами веб-приложения
		        }
    		},
		}
	})
	// 2. Загрузка задач
	grunt.loadNpmTasks('grunt-contrib-connect');  // Загрузка плагинов
	grunt.loadNpmTasks('grunt-openui5');

	// 3. Регистрация задач (создание псевдонимов)
	grunt.registerTask('serve', [					// Создание псевдонима для запуска задачи openui5_connect с параметром
			'openui5_connect:src:keepalive'
	]);

	grunt.registerTask('default', [					// Задача по умолчанию
    	'serve'
    ]);
}