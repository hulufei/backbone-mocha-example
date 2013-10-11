// Generated on 2013-09-03 using generator-frontend 1.0.3

module.exports = function(grunt) {

    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        banner: '/*! <%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n',
        bower: grunt.file.readJSON('.bowerrc'),

        srcDir: 'src',
        buildDir: 'out',
        jsDir: 'js',
        jsVendorName: 'vendor',
        jsAppName: 'app',
        jsBundleName: 'bundle',
        stylusDir: 'stylus',
        cssDir: 'css',
        cssName: 'main',
        imgDir: 'img',
        fontsDir: 'fonts',
        pagesDir: 'pages',
        testDir: 'test',

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: './<%= buildDir %>',
                    middleware: function(connect, options) {
                        return [
                            require('connect-livereload')(),
                            connect.static(options.base)
                        ];
                    }
                }
            }
        },

        clean: {
            css: {src: '<%= csso.dist.src %>'},
            js: {src: '<%= uglify.dist.src %>'},
            img: {src: '<%= copy.img.dest %>'},
            fonts: {src: '<%= copy.fonts.dest %>'}
        },

        copy: {
            img: {
                expand: true,
                cwd: '<%= srcDir %>/<%= imgDir %>/',
                src: ['{,*/}*'],
                dest: '<%= buildDir %>/<%= imgDir %>/'
            },

            fonts: {
                expand: true,
                cwd: '<%= srcDir %>/<%= fontsDir %>/',
                src: ['{,*/}*'],
                dest: '<%= buildDir %>/<%= fontsDir %>/'
            },

            html: {
                expand: true,
                cwd: '<%= srcDir %>/pages/',
                src: ['**/*.html'],
                dest: '<%= buildDir %>/'
            },

            toTest: {
                expand: true,
                src: '<%= concat.vendor.dest %>',
                dest: '<%= testDir %>/assets/',
                flatten: true
            }
        },

        mocha: {
            options: {
                run: true,
                log: true,
                reporter: 'Spec'
            },
            all: ['<%= testDir %>/**/*.html']
        },

        jade: {
            options: {
                pretty: true
            },
            dist: {
                expand: true,
                ext: '.html',
                flatten: true,
                src: ['<%= srcDir %>/<%= pagesDir %>/*.jade'],
                dest: '<%= buildDir %>/'
            }
        },

        stylus: {
            dist: {
                options: {
                    compress: false,
                    paths: ['<%= bower.directory %>'],
                    'include css': true,
                    banner: '<%= banner %>'
                },
                files: {
                    '<%= buildDir %>/<%= cssDir %>/<%= cssName %>.css': '<%= srcDir %>/<%= stylusDir %>/main.styl'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ie 10']
            },
            dist: {
                src: '<%= buildDir %>/<%= cssDir %>/<%= cssName %>.css',
                dest: '<%= buildDir %>/<%= cssDir %>/<%= cssName %>.css'
            }
        },

        csslint: {
            options: {
                'adjoining-classes': false,
                'box-model': false,
                'box-sizing': false,
                'compatible-vendor-prefixes': false,
                'font-sizes': false,
                'gradients': false,
                'important': false,
                'outline-none': false,
                'qualified-headings': false,
                'regex-selectors': false,
                'text-indent': false,
                'unique-headings': false,
                'universal-selector': false,
                'unqualified-attributes': false,
                'known-properties': false
            },
            dist: {
                src: '<%= buildDir %>/<%= cssDir %>/<%= cssName %>.css'
            }
        },

        csso: {
            options: {
                report: 'min'
            },
            dist: {
                src: '<%= buildDir %>/<%= cssDir %>/<%= cssName %>.css',
                dest: '<%= buildDir %>/<%= cssDir %>/<%= cssName %>.min.css'
            }
        },

        concat: {
            vendor: {
                src: [
                    // '<%= bower.directory %>/todomvc-common/base.js',
                    '<%= bower.directory %>/jquery/jquery.js',
                    '<%= bower.directory %>/underscore/underscore.js',
                    '<%= bower.directory %>/backbone/backbone.js',
                    '<%= bower.directory %>/backbone.localStorage/backbone.localStorage.js',
                    // '<%= bower.directory %>/bpopup/jquery.bpopup.js',
                    // '<%= bower.directory %>/flexslider/jquery.flexslider.js',
                    // '<%= bower.directory %>/herotabs/dist/jquery.herotabs.js',
                    // '<%= bower.directory %>/powertip/jquery.powertip.js',
                    // More components here
                ],
                dest: '<%= buildDir %>/<%= jsDir %>/<%= jsVendorName %>.js'
            }
        },

        browserify: {
            options: {
                ignore: '<%= bower.directory %>/',
                transform: ['brfs']
            },
            dist: {
                options: {
                    external: [''],
                    debug: grunt.option('debug')
                },
                src: '<%= srcDir %>/<%= jsDir %>/app.js',
                dest: '<%= buildDir %>/<%= jsDir %>/<%= jsAppName %>.js'
            },
            toTest: {
                src: '<%= srcDir %>/<%= jsDir %>/<%= testDir %>/app.js',
                dest: '<%= testDir %>/assets/app.js'
            }
        },

        uglify: {
            options: {
                report: 'min',
                banner: '<%= banner %>'
            },
            dist: {
                src: [
                    '<%= buildDir %>/<%= jsDir %>/<%= jsVendorName %>.js',
                    '<%= buildDir %>/<%= jsDir %>/<%= jsAppName %>.js'
                ],
                dest: '<%= buildDir %>/<%= jsDir %>/<%= jsBundleName %>.min.js'
            }
        },

        sprite: {
            dist: {
                src: ['<%= srcDir %>/<%= imgDir %>/sprites/*'],
                destImg: '<%= buildDir %>/<%= imgDir %>/sprite.png',
                destCSS: '<%= srcDir %>/<%= stylusDir %>/partials/sprites.styl',
                imgPath: '../<%= imgDir %>/sprite.png',
                algorithm: 'binary-tree',
                padding: 5
            }
        },

        imagemin: {
            dist: {
                expand: true,
                cwd: '<%= buildDir %>/<%= imgDir %>/',
                src: ['{,*/}*.{png,jpg,jpeg,gif}'],
                dest: '<%= buildDir %>/<%= imgDir %>/'
            }
        },

        watch: {

            jade: {
                files: ['<%= srcDir %>/**/*.jade'],
                tasks: ['jade']
            },

            stylus: {
                files: ['<%= srcDir %>/<%= stylusDir %>/{,*/}*.styl'],
                tasks: ['stylus', 'autoprefixer', 'csslint']
            },

            js: {
                files: ['<%= srcDir %>/<%= jsDir %>/**/*.js', '!<%= bower.directory %>/'],
                tasks: ['browserify']
            },

            vendor: {
                files: ['<%= bower.directory %>/{,*/}*.js'],
                tasks: ['concat:vendor']
            },

            img: {
                files: ['<%= srcDir %>/<%= imgDir %>/{,*/}*'],
                tasks: ['clean:img', 'copy:img', 'sprite']
            },

            fonts: {
                files: ['<%= srcDir %>/<%= fontsDir %>/{,*/}*'],
                tasks: ['clean:fonts', 'copy:fonts']
            },

            html: {
                files: ['<%= srcDir %>/**/*.html'],
                tasks: ['copy:html']
            },

            livereload: {
                options: {
                    livereload: true
                },
                files: ['<%= buildDir %>/**/*']
            }
        }

    });

    grunt.registerTask('default', [
        'connect',
        'concat:vendor', 'browserify',
        'copy',
        'jade',
        'stylus', 'autoprefixer',
        'watch'
    ]);

    grunt.registerTask('release', [
        'browserify',
        'uglify',
        'jade',
        'csso',
        'clean:css', 'clean:js',
        'imagemin'
    ]);

};
