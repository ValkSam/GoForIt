/**
 * Created by Valk on 21.05.2016.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'uglify']
            },
            css: {
                files: ['src/css/*.css'],
                tasks: ['concat', 'cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};