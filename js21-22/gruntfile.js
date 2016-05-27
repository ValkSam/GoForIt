/**
 * Created by Valk on 21.05.2016.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/jsECMA6',
                    src: ['*.js'],
                    dest: 'src/js',
                    ext: '.js',
                    extDot: 'first'
                }]
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['*.scss'],
                    dest: 'src/css',
                    ext: '.css'
                }]
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';\n'
                },
                src: ['scr/js/init.js', 'src/js/**/*.js'],
                dest: 'target/js/main.js'
            },
            css: {
                src: ['src/css/reset.css', 'src/css/main.css', 'src/css/*.css'],
                dest: 'target/css/style.css'
            }
        },
        uglify: {
            js: {
                options: {
                    mangle: true
                },
                files: {
                    'target/js/main.min.js': ['target/js/main.js']
                }
            }
        },
        cssmin: {
            css: {
                options: {
                    keepSpecialComments: 1
                },
                src: 'target/css/style.css',
                dest: 'target/css/style.min.css'
            }
        },
        copy: {
            font: {
                expand: true,
                cwd: 'src/font',
                src: '**',
                dest: 'target/font'
            },
            img: {
                expand: true,
                cwd: 'src/img',
                src: '**',
                dest: 'target/img'
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel', 'concat:js', 'uglify']
            },
            css: {
                files: ['src/css/*.css'],
                tasks: ['concat:css', 'cssmin']
            },
            scss: {
                files: ['src/scss/*.scss'],
                tasks: ['sass', 'concat:css', 'cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['babel', 'sass', 'concat', 'cssmin', 'copy']);

};