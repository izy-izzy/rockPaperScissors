///<reference path="../../../../main.d.ts" />
var games;
(function (games) {
    'use strict';
    var GameService = (function () {
        function GameService($q, API, $filter, GAME_OPTIONS_CONSTANTS) {
            this.$q = $q;
            this.API = API;
            this.$filter = $filter;
            this.GAME_OPTIONS_CONSTANTS = GAME_OPTIONS_CONSTANTS;
        }
        GameService.prototype.getGames = function () {
            return this.API.getGames();
        };
        GameService.prototype.gameScoreFromPlayerPerspective = function (game) {
            // rock => 0, paper => 1, scissors => 2
            // draw => 0, lose => -1, win => 1
            /*
                        | 	rock 	| paper 	| scissors
            -----------------------------------------------
                rock	|	0		| -1		| 1
                paper   |	1		| 0			| -1
                scissors|	-1		| 1			| 0
            */
            var winResultsTable = [
                [0, -1, 1],
                [1, 0, -1],
                [-1, 1, 0]
            ];
            var playerOptionNumericalValue = this.$filter('gameOptionToNumber')(game.playerOption);
            var computerOptionNumericalValue = this.$filter('gameOptionToNumber')(game.computerOption);
            var result;
            if (playerOptionNumericalValue >= 0 && computerOptionNumericalValue >= 0) {
                result = winResultsTable[playerOptionNumericalValue][computerOptionNumericalValue];
            }
            else {
                result = null;
            }
            return result;
        };
        GameService.prototype.addCleanGame = function () {
            var defer = this.$q.defer();
            this.API.addGame(this.getCleanGame())
                .then(function (res) {
                defer.resolve(res);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        };
        GameService.prototype.hasPlayerPlayedInGame = function (game) {
            return angular.isDefined(game) && (game !== null)
                && angular.isDefined(game.playerOption) && (game.playerOption !== null)
                && (game.playerOption !== '');
        };
        GameService.prototype.playGameAsPlayer = function (game, option) {
            return this.playGame(game, option, true);
        };
        GameService.prototype.playGameAsComputer = function (game, option) {
            return this.playGame(game, option, false);
        };
        GameService.prototype.deleteAllGames = function () {
            var defer = this.$q.defer();
            this.API.clearGames()
                .then(function (res) {
                defer.resolve(res);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
            ;
        };
        GameService.prototype.getNewComputerOption = function () {
            var _this = this;
            // get Options from the cosntants
            var optionsStats = {};
            this.GAME_OPTIONS_CONSTANTS.forEach(function (option) {
                optionsStats[option.label] = {
                    count: 0,
                    probability: 0,
                    tresholdMin: 0,
                    tresholdMax: 0
                };
            });
            // count all the options that player ever chosen
            var count = 0;
            var gamesList = this.API.getGames();
            gamesList.forEach(function (game) {
                if (_this.hasPlayerPlayedInGame(game)) {
                    optionsStats[game.playerOption].count++;
                    count++;
                }
            });
            // put tresholds for options
            var totalTreshold = 0;
            this.GAME_OPTIONS_CONSTANTS.forEach(function (option) {
                optionsStats[option.label].probability = optionsStats[option.label].count / count;
                optionsStats[option.label].tresholdMin = totalTreshold;
                optionsStats[option.label].tresholdMax = totalTreshold + optionsStats[option.label].probability;
                totalTreshold = totalTreshold + optionsStats[option.label].probability;
            });
            var genertedRandomNumber = Math.random();
            var playerExpectedOption = '';
            // iterate over tresholds and choose the option
            this.GAME_OPTIONS_CONSTANTS.forEach(function (option) {
                if ((optionsStats[option.label].tresholdMin < genertedRandomNumber) && (genertedRandomNumber <= optionsStats[option.label].tresholdMax)) {
                    playerExpectedOption = option.label;
                }
            });
            var counterOption = this.getWinningOptionToCounter(playerExpectedOption);
            return counterOption;
        };
        /**
         * Returs a clean game. No players has played in this game.
         * @private
         * @returns {IGame}
         * @memberOf GameService
         */
        GameService.prototype.getCleanGame = function () {
            var game = {
                computerOption: '',
                playerOption: '',
                timestamp: (new Date()).getTime()
            };
            return game;
        };
        /**
         * Choose best option to counter passed option
         * @private
         * @param {string} option
         * @returns {string}
         * @memberOf GameService
         */
        GameService.prototype.getWinningOptionToCounter = function (option) {
            switch (option) {
                case 'rock':
                    return 'paper';
                case 'paper':
                    return 'scissors';
                case 'scissors':
                    return 'rock';
                default:
                    return 'rock'; // Not optimal can be changed in a future
            }
        };
        /**
         * Select option for a player or computer in a game.
         * @private
         * @param {IGame} game
         * @param {string} value
         * @param {boolean} asPlayer
         * @returns {angular.IPromise<any>}
         * @memberOf GameService
         */
        GameService.prototype.playGame = function (game, value, asPlayer) {
            var defer = this.$q.defer();
            var field;
            asPlayer ? field = 'playerOption' : field = 'computerOption';
            this.API.updateGame(game, value, field)
                .then(function (res) {
                defer.resolve(res);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        };
        GameService.$inject = ['$q', 'API', '$filter', 'GAME_OPTIONS_CONSTANTS'];
        return GameService;
    }());
    angular
        .module('games')
        .service('GameService', GameService);
})(games || (games = {}));
