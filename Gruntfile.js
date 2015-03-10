'use strict';

module.exports = function(grunt) {
	
	grunt.initConfig({

		dir: {
			bower_components: 'bower_components',    // Директория установки bower компонентов
			webapp: 'webapp',					     // Директория с исходным кодом приложения
			dist: 'dist'						     // Директория для продуктивной версия приложения
		},
	// 1. Конфигурирование задач
		connect: {
	    	src: {
                options: {                            // Development
                    port: 8080,                       // Порт на котором будет доступен веб-сервер
                    hostname: 'localhost',            // Хост который будет использовать веб-сервер
                    livereload: true                  // Активация инжектирования клиента livereload
                }
            },

            dist: {
                options: {                            // Prodaction
                port: 8090,                           // Порт на котором будет доступен веб-сервер
                hostname: 'localhost',                // Хост который будет использовать веб-сервер
                }
            }
		},

        openui5_connect: {                       //  Middleware для работы с библиотекой OpenUI5
            options: {
                contextpath: '/',
                resources: [                     // Путь к библиотекам OpenUI5
                    '<%= dir.bower_components %>/openui5-sap.ui.core/resources',
                    '<%= dir.bower_components %>/openui5-sap.m/resources',
                    '<%= dir.bower_components %>/openui5-sap.ui.layout/resources',
                    '<%= dir.bower_components %>/openui5-themelib_sap_bluecrystal/resources'
                ],
                proxypath: 'proxy'              // Префикс сетевого адреса для передачи запроса через proxy-сервер
            },
            src: {
                options: {
                    appresources: '<%= dir.webapp %>'      // Директория с файлами dev версии веб-приложения
                }
            },
            dist: {
                options: {
                    appresources: '<%= dir.dist %>'         // Директория с файлами prod версии веб-приложения
                }
            },
        },
		openui5_preload: {                                // Формирование preload-файлов для компонентов
            component: {
                options: {
                    resources: {
                        cwd: '<%= dir.webapp %>',
                        prefix: 'sap/ui/demo/tdg',
                        src: [
                         '**/*.js',
                         '**/*.fragment.html',
                         '**/*.fragment.json',
                         '**/*.fragment.xml',
                         '**/*.view.html',
                         '**/*.view.json',
                         '**/*.view.xml',
                         '**/*.properties'
                		]
                    },
                    dest: '<%= dir.dist %>'

                },
                components: true,
                compress: true
            }
        },


		eslint: {										//  Статическая проверка синтаксиса
            webapp: ['<%= dir.webapp %>']
        },
        watch: {
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    "<%= dir.webapp %>/**"
                ]
            }
        },
        open: {                                     // Открытие браузера (только для Mac OS X)
            src: {
                path: "http://<%= connect.src.options.hostname %>:<%= connect.src.options.port %>",
                options: {
                    delay: 500
                },
                app: 'Google Chrome'
            },
            dist: {
                path: "http://<%= connect.dist.options.hostname %>:<%= connect.dist.options.port %>",
                options: {
                    delay: 500
                },
                app: 'Google Chrome'
            }
        },
        copy: {                                 // Копирование файлов из dev в prod версию приложения
            dist: {
                files: [ {
                    expand: true,
                    cwd: '<%= dir.webapp %>',
                    src: [
                        '**',
                        '!test/**'
                    ],
                    dest: '<%= dir.dist %>'
                } ]
            }
        },
        clean: {                                // Очистка директории с продуктивной версией приложения
            dist: '<%= dir.dist %>/'
        },
	});
	// 2. Загрузка задач
	grunt.loadNpmTasks('grunt-contrib-connect');  // Загрузка плагинов
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-openui5');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');


	// 3. Регистрация задач (создание псевдонимов)
	grunt.registerTask('serve_src', [					// Задача для запуска веб-серверя для dev верссии 
			'openui5_connect:src'
	]);

    grunt.registerTask('serve_dist', [                   // Задача для запуска веб-серверя для prod верссии 
            'openui5_connect:dist:keepalive'
    ]);

	grunt.registerTask('default', [					// Задача для работы с версией приложения для разработки. Задача по умолчанию
    	//'eslint',
    	'serve_src',
    	'open:src',
    	'watch'

    ]);
 
    grunt.registerTask('build',[                    // Задача для сборки и запуска продуктивной версии приложения
        //'eslint',
        'clean',
    	'openui5_preload',
        'copy',
        'open:dist',
        'serve_dist',
    	])
}
