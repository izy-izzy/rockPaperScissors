///<reference path="../../../main.d.ts" />

module shared {
	
	'use strict';

	var sharedModuleInject : Array<string> = [];
	sharedModuleConfig.$inject = sharedModuleInject;

	function sharedModuleConfig() {}

	angular
		.module('shared', [])
		.config(sharedModuleConfig);
}
