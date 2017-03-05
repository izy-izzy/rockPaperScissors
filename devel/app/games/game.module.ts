///<reference path="../../../main.d.ts" />

module games {
	
	'use strict';

	var gameModuleInject : Array<string> = ['$stateProvider'];
	gameModuleConfig.$inject = gameModuleInject;

	function gameModuleConfig($stateProvider) {
		$stateProvider
			.state('gamesList', { 
				url: '/games',
				component: 'gamesList'
			});
	}

	angular
		.module('games', [])
		.config(gameModuleConfig);
}
