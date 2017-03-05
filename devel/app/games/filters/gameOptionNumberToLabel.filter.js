///<reference path="../../../../main.d.ts" />
(function () {
    'use strict';
    gameOptionNumberToLabel.$inject = ['$filter', 'GAME_OPTIONS_CONSTANTS'];
    /**
     * Translate option number to string
     *
     * @param {any} $filter
     * @param {any} GAME_OPTIONS_CONSTANTS
     * @returns
     */
    function gameOptionNumberToLabel($filter, GAME_OPTIONS_CONSTANTS) {
        return function (value) {
            var optionNumber = Number(value);
            var returnValue = '';
            if (optionNumber >= 0) {
                GAME_OPTIONS_CONSTANTS.forEach(function (option) {
                    if (option.value === optionNumber) {
                        returnValue = option.label;
                    }
                });
            }
            return returnValue;
        };
    }
    angular
        .module('games')
        .filter('gameOptionNumberToLabel', gameOptionNumberToLabel);
})();
