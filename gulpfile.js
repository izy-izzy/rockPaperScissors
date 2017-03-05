(function () {

	'use strict';

	const gulp = require('gulp-help')(require('gulp'));
	const gulpCopy = require('gulp-copy');
	const scss = require('gulp-sass');
	const scsslint = require('gulp-scss-lint');
	const watch = require('gulp-watch');
	const concat = require('gulp-concat');
	const minifyJS = require('gulp-minify');
	const gutil = require('gulp-util');
	const sourcemaps = require('gulp-sourcemaps');
	const cssnano = require('gulp-cssnano');
	const notify = require("gulp-notify");
	const ts = require('gulp-typescript');
	const runSequence = require('run-sequence');
	const htmlify = require('gulp-angular-htmlify');
	const htmlhint = require("gulp-htmlhint");
	const imagemin = require('gulp-imagemin');
	const pngquant = require('imagemin-pngquant');

	const imagesFiles = [
		'./devel/images/**/*.png',
		'./devel/images/**/*.jpg',
		'./devel/images/**/*.jpeg'
	];

	const fontsFiles = [
		'./node_modules/font-awesome/fonts/*.*',
	];

	const typescriptFiles = [
		'./devel/**/*.ts'
	];

	const javaScriptLibFiles = [
		'./node_modules/angular/angular.min.js',
		'./node_modules/angular-aria/angular-aria.min.js',
		'./node_modules/firebase/firebase.js',
		'./node_modules/angularfire/dist/angularfire.min.js',
		'./node_modules/angular-ui-router/release/angular-ui-router.min.js',
		'./node_modules/angular-animate/angular-animate.min.js',
	]

	const javascriptSourceFiles = [
		'./devel/**/*.js',
		'!./devel/**/*.spec.js',
		'!./devel/**/*.e2e.js'
	]

	const javascriptFiles = javaScriptLibFiles.concat(javascriptSourceFiles);

	const htmlFiles = [
		'./devel/**/*.html'
	];

	const scssFiles = [
		'./devel/scss/**/*.scss'
	];

	const cssFiles = [
	
	];

	// MAIN RUN 
	gulp.task('default', 'Run for one time build.',() => {
		return  runSequence('imagemin', 'copy-fonts', 'css', 'scss-lint', 'scss', 'typescript', 'scripts', 'html-lint', 'export-html');
	});

	gulp.task('css','Packs CSS Modules files. (3rd party)', () => {
		return gulp.src(cssFiles)
			.pipe(concat('lib.css'))
			.pipe(gulp.dest('./public/css/'));
	});

	// RUNS MAIN AND WATCH
	gulp.task('watch', 'Runs the default task and watches the SCSS, Typescript and templates.', ['default'], () => {
		gulp.watch(scssFiles, () => {
				runSequence('scss-lint','scss');
			});
		gulp.watch(typescriptFiles, () => {
				runSequence('typescript','scripts')
			});
		gulp.watch(htmlFiles, () =>  {
				runSequence('html-lint','export-html')
			});
		});

	gulp.task('export-html', 'Copy the html templates to public.' ,() => {
		return gulp.src(htmlFiles)
			.pipe(gulpCopy('./public/templates/',{prefix:2}))
			//.pipe(notify('Copy: TEMPLATES -> completed.'));
	});

	gulp.task('copy-fonts', 'Copy the fonts to public.' ,() => {
		return gulp.src(fontsFiles)
			.pipe(gulpCopy('./public/fonts/',{prefix:3}))
			//.pipe(notify('Copy: TEMPLATES -> completed.'));
	});


	gulp.task('scss','Compiles the scss into css and minify.', () => {
	return gulp.src(scssFiles)
		.pipe(sourcemaps.init())
		.pipe(scss().on('error', scss.logError))
		.pipe(cssnano())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/css/'))
		//.pipe(notify('Compilation: SCSS -> completed.'));
	});

	gulp.task('scripts', 'Compiles the script files into "app.js".',() => {
		return gulp.src(javascriptFiles)
		.pipe(concat('app.js'))
		.pipe(sourcemaps.init())
		.pipe(minifyJS({mangle: true}).on('error',
		    function(e) {
		        gutil.log(e);
		        this.emit('end');
		    }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/js/'))
		//.pipe(notify('Compilation: SCRIPTS -> completed.'));
	});

	gulp.task('typescript', 'Transpile typescript files into javascrip files.', () => {
		return gulp.src(typescriptFiles)
			.pipe(sourcemaps.init())
			.pipe(ts({
				module: 'amd',
				target: "es5"
			})).js.pipe(gulp.dest('devel'));
			//.pipe(notify('Compilation: TYPESCRIPT -> completed.'));
	});

	gulp.task('scss-lint', 'Runs linter for scss.', () => {
	return gulp.src(scssFiles)
		.pipe(scsslint({'config': 'lintscss.yml'}));
	});

	gulp.task('html-lint',['html-validate','html-validateClear'], () => {
		return true;
	});

	//Also transforming ui-attributes to data-ui-attributes
	gulp.task('html-validate', 'Runs linter for html templates of angular.',() => {
		return gulp.src(htmlFiles)
			.pipe(htmlify({
				customPrefixes: ['ui-']
			}))
			.pipe(htmlhint('.htmlhintafteruirc'))
			.pipe(htmlhint.reporter());
	});

	gulp.task('html-validateClear','DO NOT RUN THIS DIRECTLY. Run "html-validate" instead.', () => {
		return gulp.src(htmlFiles)
			.pipe(htmlhint('.htmlhintrc'))
			.pipe(htmlhint.reporter());
	});

	gulp.task('imagemin', 'Minifies and copy images to public', () => {
		return gulp.src(imagesFiles)
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest('./public/images'));
	});

	// KARMA 

	const Server = require('karma').Server;

	const applicationFiles = ['./public/js/app.js'];
	const mocksFiles = ['./node_modules/angular-mocks/angular-mocks.js'];
	const karmaSpecFiles = ['./devel/**/*.spec.js'];
	const karmaRunFiles = applicationFiles.concat(mocksFiles).concat(karmaSpecFiles);
	const karmaWatchFiles = applicationFiles.concat(karmaSpecFiles);

	const defaultReporters = ['spec'];
	
	gulp.task('karma', 'Runs karma for the whole application or a module', [], () => {
		if (gutil.env.module) {
			gutil.log('Running karma on:', gutil.env.module);
			gulp.run('karma-test-module');
		} else {
			gutil.log('Running karma on full coverage');
			gulp.run('karma-test-all');
		}
	}, {
		"options": {
			"module name": "Module to run test on."
		}
	});

	gulp.task('karma-watch', 'Runs the "karma" task and karma watch for the whole application or a module', [], function () {
		gulp.run('karma');
		if (gutil.env.module) {
			gutil.log('Running karma watch on:', gutil.env.module);
			watch(applicationFiles.concat(['./devel/app/' + gutil.env.module + '/**/*.spec.js']), () => {
				gulp.run('karma-test-module');
			});
		} else {
			gutil.log('Running full coverage karma watch.');
			watch(karmaWatchFiles, () => {
				gulp.run('karma-test-all');
			});
		}
	}, {
		"options": {
			"module name": "Module to run test on."
		}
	});

	gulp.task('karma-test-module', false, [], (done) => {
		const karmaServer = new Server({
			configFile: __dirname + '/karma.conf.js',
			singleRun: true,
			files: applicationFiles.concat(mocksFiles).concat(['./devel/app/' + gutil.env.module + '/**/*.spec.js']),
			reporters: defaultReporters
		}, function (exitCode) {
			done();
		}).start();
	});

	gulp.task('karma-test-all', false, [], (done) => {
		const karmaServer = new Server({
			configFile: __dirname + '/karma.conf.js',
			singleRun: true,
			reporters: defaultReporters,
			files: karmaRunFiles
		}, function (exitCode) {
			done();
		}).start();
	});

})();
