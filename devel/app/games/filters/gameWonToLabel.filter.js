///<reference path="../../../../main.d.ts" />
(function () {
    'use strict';
    gameWonToLabel.$inject = ['$filter'];
    /**
     * Returns from number the string value of the game gameWon
     * -1 => lose, 0 => draw, 1 => win
     *
     * @param {any} $filter
     * @returns
     */
    function gameWonToLabel($filter) {
        return function (gameWon) {
            if (angular.isDefined(gameWon) && (gameWon !== null)) {
                switch (gameWon) {
                    case 0:
                        return 'draw';
                    case 1:
                        return 'win';
                    case -1:
                        return 'lose';
                    default:
                        return 'unknown';
                }
            }
            else {
                return 'unknown';
            }
        };
    }
    angular
        .module('games')
        .filter('gameWonToLabel', gameWonToLabel);
})();
