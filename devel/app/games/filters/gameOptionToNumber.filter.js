///<reference path="../../../../main.d.ts" />
(function () {
    'use strict';
    gameOptionToNumber.$inject = ['$filter', 'GAME_OPTIONS_CONSTANTS'];
    /**
     * Returns from game option the number that it represents
     *
     * @param {any} $filter
     * @param {any} GAME_OPTIONS_CONSTANTS
     * @returns
     */
    function gameOptionToNumber($filter, GAME_OPTIONS_CONSTANTS) {
        return function (label) {
            var labelAsString = String(label);
            var returnValue = -1;
            if (labelAsString !== '') {
                GAME_OPTIONS_CONSTANTS.forEach(function (option) {
                    if (option.label === labelAsString) {
                        returnValue = option.value;
                    }
                });
            }
            return returnValue;
        };
    }
    angular
        .module('games')
        .filter('gameOptionToNumber', gameOptionToNumber);
})();
