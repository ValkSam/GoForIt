'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css'),
    build = require('run-sequence'),
    del = require('del');

var init = {
    html: {
        src: ['src/*.html'],
        destFolder: './'
    },
    concat: {
        js: {
            src: ['scr/js/init.js', 'src/js/**/*.js'],
            destFile: 'main.js',
            destFolder: 'target/js/'
        },
        css: {
            src: ['src/css/reset.css', 'src/css/main.css', 'src/css/*.css'],
            destFile: 'style.css',
            destFolder: 'target/css/'
        }
    },
    uglify: {
        js: {
            src: ['target/js/main.js'],
            destFile: 'main.min.js',
            destFolder: 'target/js/'
        }
    },
    cssmin: {
        css: {
            src: ['target/css/style.css'],
            destFile: 'style.min.css',
            destFolder: 'target/css/'
        }
    },
    clean: {
        dest: 'target/**'
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
};

gulp.task('html:build', function () {
    gulp.src(init.html.src)
        .pipe(rigger())
        .pipe(gulp.dest(init.html.destFolder));

});

gulp.task('js:concat', function () {
    return gulp.src(init.concat.js.src)
        .pipe(concat(init.concat.js.destFile, {newLine: ';\n'}))
        .pipe(gulp.dest(init.concat.js.destFolder));
});

gulp.task('js:uglify', function () {
    return gulp.src(init.uglify.js.src)
        .pipe(uglify())
        .pipe(gulp.dest(init.uglify.js.destFolder));
});

gulp.task('js:build', function () {
    return gulp.src(init.concat.js.src)
        .pipe(concat({path: init.uglify.js.destFile, newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest(init.uglify.js.destFolder));
});

gulp.task('css:concat', function () {
    return gulp.src(init.concat.css.src)
        .pipe(concat(init.concat.css.destFile))
        .pipe(gulp.dest(init.concat.css.destFolder));
});

gulp.task('css:minify', function () {
    return gulp.src(init.cssmin.css.src)
        .pipe(cleanCSS())
        .pipe(gulp.dest(init.cssmin.css.destFolder));
});

gulp.task('css:build', function () {
    return gulp.src(init.concat.css.src)
        .pipe(concat(init.cssmin.css.destFile))
        .pipe(cleanCSS())
        .pipe(gulp.dest(init.cssmin.css.destFolder));
});

gulp.task('clean', function () {
    del(init.clean.dest);
});

gulp.task('build', function () {
    build('clean', ['js:build', 'css:build', 'html:build']);
});


