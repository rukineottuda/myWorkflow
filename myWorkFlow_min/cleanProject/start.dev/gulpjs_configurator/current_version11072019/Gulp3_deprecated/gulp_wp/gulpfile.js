var gulp         = require('gulp'),
		sass 				 = require('gulp-sass'),
		browserSync  = require('browser-sync'),
		bourbon      = require('bourbon'),
		uglify			 = require('gulp-uglify'),
		concat			 = require('gulp-concat'),
		pump			   = require('pump'),
		rename			 = require('gulp-rename'),
		cssnano		   = require('gulp-cssnano'),
		del		   		 = require('del'),
		imagemin   	 = require('gulp-imagemin'),
		pngquant 		 = require('imagemin-pngquant'),
		cache 		   = require('gulp-cache'),
		autoprefixer = require('gulp-autoprefixer');



// gulp.task('browser-sync',['style','scripts'], function() {
gulp.task('browser-sync',['style','scripts'], function() {
	browserSync.init({
	proxy: "Escort.dev",
				notify: false
	});
});


gulp.task('style', function () {
	return gulp.src('sass/**/*.sass') //раскомментировать по окончании
	// return gulp.src('sass/test.sass')
	// .pipe(sass().on('error', sass.logError)).pipe(gulp.dest('app/css/'))
	.pipe(sass.sync({includePaths: require('bourbon').includePaths}).on('error', sass.logError)).pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8','ie 7'],{cascade: true}))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('wordpress/wp-content/themes/Escort/css/'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('css-libs', function() {
	return gulp.src('wordpress/wp-content/themes/Escort/css/libs.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('wordpress/wp-content/themes/Escort/css/'));
});

gulp.task ('scripts', function() {
			return gulp.src([
					//сюда подключать плагины js
				'wordpress/wp-content/themes/Escort/libs/modernizr/modernizr.js',
				'wordpress/wp-content/themes/Escort/libs/jquery/jquery-1.11.2.min.js',
				'wordpress/wp-content/themes/Escort/libs/waypoints/waypoints.min.js',
				'wordpress/wp-content/themes/Escort/libs/animate/animate-css.js',
				'wordpress/wp-content/themes/Escort/libs/owl-carousel/owl.carousel.min.js',
				'wordpress/wp-content/themes/Escort/libs/equalHeights/equalheights.min.js',// чтобы колонки были одинаковой высоты ,в независимости от содержимого
				'wordpress/wp-content/themes/Escort/libs/Magnific-Popup/jquery.magnific-popup.min.js',// какойтонекритичный косяк в min.js (исходнике)
				'wordpress/wp-content/themes/Escort/libs/animateNumber/jquery.animateNumber.min.js',
				'wordpress/wp-content/themes/Escort/libs/selectize/dist/js/standalone/selectize.min.js',
			])
			//через pump не вышло =(
			.pipe(concat('libs.js'))
			// .pipe(uglify())
			.pipe(gulp.dest('wordpress/wp-content/themes/Escort/js'))
});

gulp.task('img', function() {
	return gulp.src('wordpress/wp-content/themes/Escort/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('wordpress/wp-content/themes/Escort/img'));
});



gulp.task('watch', function() {
	gulp.watch('sass/**/*.sass',['style']);
	gulp.watch('wordpress/wp-content/themes/Escort/js/**/*.js', ['scripts']);
	gulp.watch('wordpress/wp-content/themes/Escort/**/*.php').on('change', browserSync.reload);
});

//очистка кэша
gulp.task('clear', function () {
    return cache.clearAll();
});


gulp.task('clean', function(){
	return del.sync('dist');
});


gulp.task('build', ['clean', 'img', 'style', 'scripts'], function(){
var buildCss = gulp.src([
	'../wp-content/themes/Escort/css/main.min.css',
	'../wp-content/themes/Escort/css/libs.min.css'
	])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('../wp-content/themes/Escort/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('../wp-content/themes/Escort/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('../wp-content/themes/Escort/*.html')
	.pipe(gulp.dest('dist'));

});
gulp.task('default', ['browser-sync', 'watch']);




