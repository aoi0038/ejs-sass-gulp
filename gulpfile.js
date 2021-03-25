// plugin
const gulp = require('gulp');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const webserver = require('gulp-webserver');

// ejs compile
gulp.task('ejs', () => {
  console.log("ejsが動いた");
  return gulp.src("./src/ejs/*.ejs")
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(ejs('', { "ext": ".html" }))
    .pipe(gulp.dest("./dist"));
});

// sass compile
gulp.task('sass', () => {
  console.log("sassが動いた");
  return gulp.src("./src/scss/*.scss")
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest("./dist/css"));
});


// local server
gulp.task('webserver', () => {
  gulp.src("./dist") // 公開したい静的ファイルを配置したディレクトリを指定する
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true
    }));
});

gulp.task('watch', function () {
  console.log("hoge");
  gulp.watch('./src/scss/**/*.scss', gulp.task('sass'));
  gulp.watch('./src/ejs/**/*.ejs', gulp.task('ejs'));
});

gulp.task('default', gulp.series('watch', 'webserver'));
