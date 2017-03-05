exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	//seleniumServerJar: '../node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.47.1.jar',
	specs: [
		'./devel/**/*.e2e.js'
	],
	frameworks: ['jasmine'],
	onPrepare: function() {
		let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
		jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
	},
	baseUrl:'http://localhost:8080',
	reporters: ['spec']
};