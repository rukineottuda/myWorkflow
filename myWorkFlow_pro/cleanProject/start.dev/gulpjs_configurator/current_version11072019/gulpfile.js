/**
 * Gulp 4  tasks file created 11.07.2019
 * основные изменения, добавлены конструкции:
 * gulp.parallel();
 * gulp.series();
 */
"use strict";
var gulp  = require('gulp'),
		sass 				 = require('gulp-sass'),//Подключаем Sass пакет
		bourbon    	 = require('bourbon'),//Подключаем бурбон	
		uglify			 = require('gulp-uglify'),//Подключаем пакет  минификации (js)
		concat			 = require('gulp-concat'),//Подключаем пакет конкатенации файлов
		pump			   = require('pump'),//Подключаем Pump в проекте не использовалось(использую pipe)
		rename			 = require('gulp-rename'),//Подключаем библиотеку переименовывания файлов
		cssnano			 = require('gulp-cssnano'),//Подключаем пакет минификации css
		del		   		 = require('del'),//Подключаем библиотеку для удаления файлов  и папок
		imagemin   	 = require('gulp-imagemin'),//Подключаем библиотеку для работы с изображениями
		pngquant		 = require('imagemin-pngquant'),//Подключаем библиотеку для работы с png изображениями
		cache				 = require('gulp-cache'),//Подключаем библиотеку кеширования
		autoprefixer = require('gulp-autoprefixer'),//Подключаем библиотеку для добавления автопрефикса
		browserSync  = require('browser-sync');//Подключаем browser Sync

//customVars
var gulpversion = '3';//переменная версий не сработало [not working block]

//Живая перезагрузка html файлов 
gulp.task('code',function(){
	return gulp.src('app/*.html')//папка html файлов
	.pipe(browserSync.reload({stream: true}))
});

//Sass-комбайн(Препроцессинг, минификация выгрузка, перезагрузка страницы(browser-sync))
gulp.task('style', function () {
	return gulp.src('app/sass/**/*.sass') //раскомментировать по окончании
	// .pipe(sass().on('error', sass.logError)).pipe(gulp.dest('app/css/'))
	.pipe(sass().on('error', sass.logError))
	// .pipe(sass.sync({includePaths: require('bourbon').includePaths})
	.pipe(sass.sync({includePaths: bourbon.includePaths})
	.on('error', sass.logError)).pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8','ie 7'],{cascade: true}))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css/'))
	.pipe(browserSync.reload({stream: true}));
});

// Минификация библиотек css
gulp.task('css-libs', function() {
	return gulp.src('app/css/libs.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css/'));
});

//Подключение библиотек скриптов, последующая конкатенация, минификация(еасли включена) и выгрузка в папку
gulp.task ('scripts', function() {
	return gulp.src([
			//сюда подключать плагины js
		'./app/libs/modernizr/modernizr.js',
		'./app/libs/jquery/jquery-3.2.1.min.js',
		'./app/libs/waypoints/waypoints.min.js',
		'./app/libs/animate/animate-css.js',
		'app/libs/owl-carousel/owl.carousel.min.js',
		// 'app/libs/owl-carousel/owl_custom.carousel.js',
		'./app/libs/equalHeights/equalheights.min.js',// чтобы колонки были одинаковой высоты ,в независимости от содержимого
		'./app/libs/Magnific-Popup/jquery.magnific-popup.min.js',// какой-тонекритичный косяк в min.js (исходнике)
		'./app/libs/animateNumber/jquery.animateNumber.min.js',
		'./app/libs/selectize/dist/js/standalone/selectize.min.js',
	])
	//через pump не вышло =(
	.pipe(concat('libs.js'))
	// .pipe(uglify())// минификация
	.pipe(gulp.dest('app/js'))
});

//Поднимаем локальный сервер c помощью пакета browser-sync
// gulp.task('browser-sync', function() {
gulp.task('browser-sync', function() {
// gulp.task('browser-sync',gulp.parallel('style','scripts'), function() {
browserSync.init({
proxy: "eletsky.ru",//без прописывания в  hosts не работает(в opens server прописывается автоматом)
	notify: false
	});
//раскомментировать если нужен не прокси(не цепляет php и прочее только html, js, css);
// browserSync({
// 	server: {
// 		baseDir: 'app'
// 	},
// 	notify: false
// 	})
});


gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({ // С кешированием
		// .pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
	});
	
//очистка кеша
gulp.task('clear', function () {
	return cache.clearAll();
});
	
//удаление содержимого папки продакшена
gulp.task('clean', function(){
	return del('dist');
});


//Постоянное наблюдение за файлами
gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('style'));
	gulp.watch('app/js/**/*.js', gulp.parallel('scripts'));
	gulp.watch('app/**/*.html').on('change', browserSync.reload);
	gulp.watch('app/**/*.php').on('change', browserSync.reload);
});

gulp.task('prebuild', async function(){
	// console.log('ebal vash rot');
	var buildCss = gulp.src('app/css/main.min.css').pipe(gulp.dest('dist/css'));
	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));
});


gulp.task('default', gulp.parallel('browser-sync','watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'style', 'scripts'));

// Not Working [not working block]START>

// if(gulpversion == 3){
	// 	gulp.task('watch', function() {
		// 		// gulp.watch('app/sass/**/*.sass', ['style']);
		// 		// gulp.watch('app/js/**/*.js', ['scripts']);
		// 		gulp.watch('app/**/*.html').on('change', browserSync.reload);
		// 		gulp.watch('app/**/*.php').on('change', browserSync.reload);
		// 		console.log("запущен галп версией 3");
		// 	});
		// 	gulp.task('default', ['browser-sync', 'watch']);
		// }
// if(gulpversion == 4){
			// 	gulp.task('watch', function() {
				// 		// gulp.watch('app/sass/**/*.sass', gulp.parallel('style'));
				// 		// gulp.watch('app/js/**/*.js', gulp.parallel('scripts'));
				// 		gulp.watch('app/**/*.html').on('change', browserSync.reload);
				// 		gulp.watch('app/**/*.php').on('change', browserSync.reload);
				// 	});
				// 	gulp.task('default', gulp.parallel('browser-sync', 'watch'));
				// 	console.log("запущен галп версией 4");
		// }
				
	// Not Working [not working block]END<