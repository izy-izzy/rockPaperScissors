///<reference path="../../../../main.d.ts" />
var games;
(function (games) {
    'use strict';
    var gameListsController = (function () {
        function gameListsController(GameService, $filter) {
            this.GameService = GameService;
            this.$filter = $filter;
            this.init();
        }
        /**
         * Initialisation of the component
         * @private
         * @memberOf gameListsController
         */
        gameListsController.prototype.init = function () {
            this.gamesList = this.GameService.getGames();
            this.errorMessage = null;
        };
        gameListsController.prototype.isGameWonByPlayer = function (game) {
            return (this.GameService.gameScoreFromPlayerPerspective(game) > 0);
        };
        gameListsController.prototype.isGameLostByPlayer = function (game) {
            return (this.GameService.gameScoreFromPlayerPerspective(game) < 0);
        };
        /**
         * Returns readable string
         * @param {IGame} game
         * @returns {string}
         * @memberOf gameListsController
         */
        gameListsController.prototype.gameResultFromPlayerPerspective = function (game) {
            var gameWon = this.GameService.gameScoreFromPlayerPerspective(game);
            return this.$filter('gameWonToLabel')(gameWon);
        };
        /**
         * Add's to the array a new game that is clean.
         * @memberOf gameListsController
         */
        gameListsController.prototype.addNewGame = function () {
            var _this = this;
            this.GameService.addCleanGame()
                .then(function (res) { return null; }, function (error) {
                _this.errorMessage = error;
            });
        };
        gameListsController.prototype.hasPlayerPlayedInGame = function (game) {
            return this.GameService.hasPlayerPlayedInGame(game);
        };
        /**
         * Player can play game with a selected option
         * It also plays as a computer. Option for the computer is computed separately.
         * @param {IGame} game
         * @param {string} option
         * @memberOf gameListsController
         */
        gameListsController.prototype.playGameWith = function (game, option) {
            var _this = this;
            this.GameService.playGameAsPlayer(game, option)
                .then(function (res) { return null; }, function (error) {
                _this.errorMessage = error;
            });
            var computerOption = this.GameService.getNewComputerOption();
            this.GameService.playGameAsComputer(game, computerOption)
                .then(function (res) { return null; }, function (error) {
                _this.errorMessage = error;
            });
        };
        /**
         * Removes all the games. Game is basically reset.
         * @memberOf gameListsController
         */
        gameListsController.prototype.deleteAllGames = function () {
            var _this = this;
            this.GameService.deleteAllGames()
                .then(function (res) { return null; }, function (error) {
                _this.errorMessage = error;
            });
        };
        gameListsController.$inject = ['GameService', '$filter'];
        return gameListsController;
    }());
    /**
     * GameList component shows list of all the games.
     * It allows to create a new game and removal of all the games.
     *
     * @class gamesListComponent
     */
    var gamesListComponent = (function () {
        function gamesListComponent() {
            this.bindings = {};
            this.controller = gameListsController;
            this.controllerAs = '$ctrl';
            this.templateUrl = '/templates/games/views/gamesList.html';
        }
        return gamesListComponent;
    }());
    angular
        .module('games')
        .component('gamesList', new gamesListComponent());
})(games || (games = {}));
;
