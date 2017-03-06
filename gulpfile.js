var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    htmlreplace = require('gulp-html-replace'),
    minifyHTML = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect-php'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('php', function() {
    connect.server({
        base: 'src/',
        keepalive: true,
        port: 8080,
        open: false
    });
});


//動態server
gulp.task('server', ['php'], function() {
    browserSync.init({
        injectChanges: true,
        proxy: '127.0.0.1:8080',
        port: 8888,
        open: true
    });
});
//broswerSync static
gulp.task('static', ['sass'], function() {
    browserSync.init({
      server: {
          baseDir: "src/"
      }
    });
});


gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.+(scss|sass)',['sass']);
    // gulp.watch('src/css/*.css', ['css']).on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch('*.php').on('change', function () {
    browserSync.reload();
    });
});


gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({
            outputStyle: 'expanded' // compact , expanded, nested
        }))
    .pipe(gulp.dest('src/css/'))
    .pipe(reload({stream: true}));
});


// gulp.task('css',function(){
//   var plugins = [
//     autoprefixer ({broswer : ['last 1 vrsion']})
//   ];
//    return gulp.src('src/css/*.css')
//    .pipe(postcss(plugins))
//    .pipe(gulp.dest('src/css/finish'));
// });

gulp.task('concatCSS', function() {
    return gulp.src('src/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css/'));
});//合併css

gulp.task('concatJS', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js/'));
});//合併js

gulp.task('minify-css', function() {
    return gulp.src('dist/css/all.css')
        .pipe(minifyCSS({
            keepBreaks: true,
        }))
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest('dist/css/'));
});//壓縮css

gulp.task('uglify',function() {
    return gulp.src('dist/js/all.js')
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('dist/js/'));
});//壓縮js

gulp.task('html-replace', function() {
    var opts = { comments: false, spare: false, quotes: true };
    return gulp.src('src/*.html')
        .pipe(htmlreplace({
            'css': 'css/all.min.css',
            'js': 'js/all.min.js'
        }))
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist/'));
});

gulp.task('imagemin', function() {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});//壓縮圖片


gulp.task('minify', ['html-replace', 'minify-css', 'uglify', 'imagemin']);
gulp.task('default', ['static','watch']);
gulp.task('online', ['server','watch']);
