///<reference path="../../main.d.ts" />
(function () {
    'use strict';
    angular.module('rpsApp', [
        'ui.router',
        'ngAnimate',
        'firebase',
        'shared',
        'games'
    ]);
    var rpsAppInject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    rpsAppConfiguration.$inject = rpsAppInject;
    function rpsAppConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/games");
    }
    angular.module('rpsApp').config(rpsAppConfiguration);
})();
