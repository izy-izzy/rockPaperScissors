///<reference path="../../../../main.d.ts" />

declare interface IAPI {
	/**
	 * Returns all games that has been created
	 * 
	 * @returns {IGame[]} 
	 * 
	 * @memberOf IAPI
	 */
	getGames():IGame[];

	/**
	 * Create new game that has been passed as params
	 * 
	 * @param {IGame} game 
	 * @returns {firebase.Promise<void>} 
	 * 
	 * @memberOf IAPI
	 */
	addGame(game:IGame): firebase.Promise<void>;

	/**
	 * Update game's field with a selected value
	 * 
	 * @param {IGame} game 
	 * @param {string} value 
	 * @param {string} field 
	 * @returns {firebase.Promise<void>} 
	 * 
	 * @memberOf IAPI
	 */
	updateGame(game:IGame, value:string, field:string):firebase.Promise<void>;
	
	/**
	 * Removes all games from the database
	 * 
	 * @returns {firebase.Promise<void>} 
	 * 
	 * @memberOf IAPI
	 */
	clearGames():firebase.Promise<void>;
}



(function(){

	'use strict';

	class Api implements IAPI {

		private firebase:firebase.app.App;
		private games:IGame[];

		static $inject = ['$firebaseObject'];

		constructor($firebaseObject) {

			var ref = firebase.database().ref('/games');
			this.games = $firebaseObject(ref);

		}

		public getGames():IGame[]{
			return this.games;
		}

		public addGame(game:IGame):firebase.Promise<void>{
			return firebase.database().ref('games/'+game.timestamp).set(game);
		}

		public updateGame(game:IGame, value:string, field:string):firebase.Promise<void>{
			var updates = {};
			updates['games/' + game.timestamp + "/" + field] = value;
			updates['games/' + game.timestamp + "/timestamp"] = (new Date()).getTime();
			return firebase.database().ref().update(updates);
		}

		public clearGames():firebase.Promise<void>{
			return firebase.database().ref('games').remove();
		}
	}

	angular
		.module('shared')
		.service('API', Api);
})();
