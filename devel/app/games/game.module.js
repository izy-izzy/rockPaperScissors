///<reference path="../../../main.d.ts" />
var games;
(function (games) {
    'use strict';
    var gameModuleInject = ['$stateProvider'];
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
})(games || (games = {}));
