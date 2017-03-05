///<reference path="../../../../main.d.ts" />

/**
 * Game service does CRUD for games. It also incorporates all the necessary functions to handle games and players.
 * 
 * @interface IGameService
 */
declare interface IGameService {
	/**
	 * returns array of games that has been created
	 * @returns {IGame[]} 
	 * @memberOf IGameService
	 */
	getGames():IGame[];
	
	/**
	 * returns game score from player perspective. 
	 * -1 => lose, 0 => draw, 1 => win
	 * @param {IGame} game 
	 * @returns {number} 
	 * @memberOf IGameService
	 */
	gameScoreFromPlayerPerspective(game:IGame):number;

	/**
	 * Add clean game to the games array. In a clean game neither of players has played yet.
	 * @returns {angular.IPromise<any>} 
	 * @memberOf IGameService
	 */
	addCleanGame(): angular.IPromise<any>;
	
	/**
	 * Indicates if the player has already played in this game.
	 * @param {IGame} game 
	 * @returns {boolean} 
	 * @memberOf IGameService
	 */
	hasPlayerPlayedInGame(game:IGame): boolean;
	
	/**
	 * Save players option in the selected game. 
	 * @param {IGame} game 
	 * @param {string} option 
	 * @returns {angular.IPromise<any>} 
	 * @memberOf IGameService
	 */
	playGameAsPlayer(game:IGame, option:string): angular.IPromise<any>;
	
	/**
	 * Save computers option in the selected game. 
	 * @param {IGame} game 
	 * @param {string} option 
	 * @returns {angular.IPromise<any>} 
	 * @memberOf IGameService
	 */
	playGameAsComputer(game:IGame, option:string): angular.IPromise<any>;

	/**
	 * Get option that is best looking for a computer according to already played games.
	 * Only data from currently saved games are used to compute probabilities.
	 * @returns {string} 
	 * @memberOf IGameService
	 */
	getNewComputerOption():string;
	
	/**
	 * Deletes all the games
	 * @returns {angular.IPromise<any>} 
	 * @memberOf IGameService
	 */
	deleteAllGames(): angular.IPromise<any>;
}

namespace games {

	'use strict';

	class GameService implements IGameService {

		static $inject: Array<string> = ['$q','API', '$filter', 'GAME_OPTIONS_CONSTANTS'];

		constructor(private $q, private API:IAPI, private $filter, private GAME_OPTIONS_CONSTANTS) {}

		public getGames():any{
			return this.API.getGames();
		}

		public gameScoreFromPlayerPerspective(game:IGame):number{
			// rock => 0, paper => 1, scissors => 2
			// draw => 0, lose => -1, win => 1
			/* 	
						| 	rock 	| paper 	| scissors
			-----------------------------------------------
				rock	|	0		| -1		| 1
				paper   |	1		| 0			| -1
				scissors|	-1		| 1			| 0
			*/
			let winResultsTable = [
				[0, -1 , 1],
				[1, 0 , -1],
				[-1, 1 , 0]
			]

			let playerOptionNumericalValue:number = this.$filter('gameOptionToNumber')(game.playerOption);
			let computerOptionNumericalValue:number = this.$filter('gameOptionToNumber')(game.computerOption);
			let result: number;

			if (playerOptionNumericalValue >= 0 && computerOptionNumericalValue >= 0){
				result = winResultsTable[playerOptionNumericalValue][computerOptionNumericalValue];
			} else {
				result = null;
			}

			return result;
		}

		public addCleanGame(): angular.IPromise<any>{
			let defer = this.$q.defer();
			this.API.addGame(this.getCleanGame())
				.then((res) => {
					defer.resolve(res);
				}, (error) => {
					defer.reject(error);
				});
			return defer.promise;
		}

		public hasPlayerPlayedInGame(game:IGame): boolean {
			return angular.isDefined(game) && (game !== null)
				&& angular.isDefined(game.playerOption) && (game.playerOption !== null)
				&& (game.playerOption !== '');
		}

		public playGameAsPlayer(game:IGame, option:string): angular.IPromise<any>{
			return this.playGame(game,option,true);
		}

		public playGameAsComputer(game:IGame, option:string): angular.IPromise<any>{
			return this.playGame(game,option,false);
		}

		public deleteAllGames(): angular.IPromise<any>{
			let defer = this.$q.defer();
			this.API.clearGames()
				.then((res) => {
					defer.resolve(res);
				}, (error) => {
					defer.reject(error);
				});
			return defer.promise;;
		}

		public getNewComputerOption():string{

			// get Options from the cosntants
			let optionsStats = {};
			this.GAME_OPTIONS_CONSTANTS.forEach((option:IGameOption) => {
				optionsStats[option.label] = {
					count: 0,
					probability: 0,
					tresholdMin: 0,
					tresholdMax: 0
				}
			});

			// count all the options that player ever chosen
			let count = 0;
			var gamesList = this.API.getGames();
			gamesList.forEach((game:IGame) => {
				if (this.hasPlayerPlayedInGame(game)){
					optionsStats[game.playerOption].count++;
					count++;
				}
			});

			// put tresholds for options
			var totalTreshold = 0;
			this.GAME_OPTIONS_CONSTANTS.forEach((option:IGameOption) => {
				optionsStats[option.label].probability = optionsStats[option.label].count / count;
				optionsStats[option.label].tresholdMin = totalTreshold;
				optionsStats[option.label].tresholdMax = totalTreshold + optionsStats[option.label].probability;
				totalTreshold = totalTreshold + optionsStats[option.label].probability;
			});

			var genertedRandomNumber = Math.random();
			var playerExpectedOption = '';

			// iterate over tresholds and choose the option
			this.GAME_OPTIONS_CONSTANTS.forEach((option:IGameOption) => {
				if ((optionsStats[option.label].tresholdMin < genertedRandomNumber) && (genertedRandomNumber <= optionsStats[option.label].tresholdMax)){
					playerExpectedOption = option.label;
				}
			});

			let counterOption = this.getWinningOptionToCounter(playerExpectedOption);

			return counterOption;
		}

		/**
		 * Returs a clean game. No players has played in this game.
		 * @private
		 * @returns {IGame}
		 * @memberOf GameService
		 */
		private getCleanGame(): IGame{
			var game:IGame = {
				computerOption : '',
				playerOption: '',
				timestamp: (new Date()).getTime()
			}
			return game;
		}

		/**
		 * Choose best option to counter passed option
		 * @private
		 * @param {string} option 
		 * @returns {string} 
		 * @memberOf GameService
		 */
		private getWinningOptionToCounter(option:string): string{
			switch (option) {
				case 'rock':
					return 'paper';
				case 'paper' : 
					return 'scissors';
				case 'scissors':
					return 'rock';
				default:
					return 'rock'; // Not optimal can be changed in a future
			}
		}

		/**
		 * Select option for a player or computer in a game.
		 * @private
		 * @param {IGame} game 
		 * @param {string} value 
		 * @param {boolean} asPlayer 
		 * @returns {angular.IPromise<any>} 
		 * @memberOf GameService
		 */
		private playGame(game:IGame, value:string, asPlayer: boolean): angular.IPromise<any>{
			let defer = this.$q.defer();
			let field:string;
			asPlayer ? field = 'playerOption': field = 'computerOption';
			this.API.updateGame(game, value, field)
				.then((res) => {
					defer.resolve(res);
				}, (error) => {
					defer.reject(error);
				});
			return defer.promise;
		}

	}

	angular
		.module('games')
		.service('GameService', GameService);

}
