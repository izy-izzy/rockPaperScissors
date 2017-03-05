///<reference path="../../../../main.d.ts" />
(function () {
    'use strict';
    var Api = (function () {
        function Api($firebaseObject) {
            var ref = firebase.database().ref('/games');
            this.games = $firebaseObject(ref);
        }
        Api.prototype.getGames = function () {
            return this.games;
        };
        Api.prototype.addGame = function (game) {
            return firebase.database().ref('games/' + game.timestamp).set(game);
        };
        Api.prototype.updateGame = function (game, value, field) {
            var updates = {};
            updates['games/' + game.timestamp + "/" + field] = value;
            updates['games/' + game.timestamp + "/timestamp"] = (new Date()).getTime();
            return firebase.database().ref().update(updates);
        };
        Api.prototype.clearGames = function () {
            return firebase.database().ref('games').remove();
        };
        Api.$inject = ['$firebaseObject'];
        return Api;
    }());
    angular
        .module('shared')
        .service('API', Api);
})();
