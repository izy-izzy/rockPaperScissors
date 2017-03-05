///<reference path="../../../main.d.ts" />
var shared;
(function (shared) {
    'use strict';
    var sharedModuleInject = [];
    sharedModuleConfig.$inject = sharedModuleInject;
    function sharedModuleConfig() { }
    angular
        .module('shared', [])
        .config(sharedModuleConfig);
})(shared || (shared = {}));
