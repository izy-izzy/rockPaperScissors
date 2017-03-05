module.exports = function(config) {
	config.set({
		basePath: './',
		frameworks: ['jasmine'],
		files: [
			'./public/js/app.js',
			'./node_modules/angular-mocks/angular-mocks.js',
			'./devel/**/*.spec.js'
		],
		exclude: [
		],
		reporters: ['spec'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_ERROR,
		autoWatch: true,
		browsers: ['PhantomJS'],
		singleRun: false,
		concurrency: Infinity
	});
};
