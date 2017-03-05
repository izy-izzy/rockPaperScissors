///<reference path="../../../../main.d.ts" />
(function () {
    'use strict';
    /**
     * Array of all the options that players may choose during game
     *
     * @class gameOptionsContants
     */
    var gameOptionsContants = (function () {
        function gameOptionsContants() {
            var gameOptions = [
                {
                    value: 0,
                    label: 'rock'
                },
                {
                    value: 1,
                    label: 'paper'
                },
                {
                    value: 2,
                    label: 'scissors'
                }
            ];
            return gameOptions;
        }
        return gameOptionsContants;
    }());
    angular.module('games').constant('GAME_OPTIONS_CONSTANTS', new gameOptionsContants());
})();
