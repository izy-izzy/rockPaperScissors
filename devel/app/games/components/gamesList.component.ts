///<reference path="../../../../main.d.ts" />

namespace games {

	'use strict';

	class gameListsController {

		public gamesList:IGame[];
		public errorMessage:string;

		static $inject: Array<string> = ['GameService', '$filter'];

		constructor(private GameService:IGameService, private $filter) {
			this.init();
		}

		/**
		 * Initialisation of the component 
		 * @private
		 * @memberOf gameListsController
		 */
		private init(){
			this.gamesList = this.GameService.getGames();
			this.errorMessage = null;
		}

		public isGameWonByPlayer(game:IGame):boolean{
			return (this.GameService.gameScoreFromPlayerPerspective(game) > 0);
		}

		public isGameLostByPlayer(game:IGame):boolean{
			return (this.GameService.gameScoreFromPlayerPerspective(game) < 0);
		}

		/**
		 * Returns readable string 
		 * @param {IGame} game 
		 * @returns {string} 
		 * @memberOf gameListsController
		 */
		public gameResultFromPlayerPerspective(game:IGame):string{
			let gameWon:number = this.GameService.gameScoreFromPlayerPerspective(game);
			return this.$filter('gameWonToLabel')(gameWon);
		}

		/**
		 * Add's to the array a new game that is clean.
		 * @memberOf gameListsController
		 */
		public addNewGame(){
			this.GameService.addNewGame()
				.then(res => null, error => {
					this.errorMessage = error;
				});
		}

		public hasPlayerPlayedInGame(game:IGame):Boolean{
			return this.GameService.hasPlayerPlayedInGame(game);
		}

		/**
		 * Player can play game with a selected option
		 * It also plays as a computer. Option for the computer is computed separately.
		 * @param {IGame} game 
		 * @param {string} option 
		 * @memberOf gameListsController
		 */
		public playGameWith(game:IGame, option:string){
			this.GameService.playGameAsPlayer(game,option)
				.then(res => null, error => {
					this.errorMessage = error;
				});

			let computerOption = this.GameService.getNewComputerOption();

			this.GameService.playGameAsComputer(game,computerOption)
				.then(res => null, error => {
					this.errorMessage = error;
				});
		}

		/**
		 * Removes all the games. Game is basically reset.
		 * @memberOf gameListsController
		 */
		public deleteAllGames(){
			this.GameService.deleteAllGames()
				.then(res => null, (error) => {
					this.errorMessage = error;
				});
		}
	}

	/**
	 * GameList component shows list of all the games.
	 * It allows to create a new game and removal of all the games.
	 * 
	 * @class gamesListComponent
	 */
	class gamesListComponent {

		public bindings: any;
		public controller: any;
		public controllerAs: any;
		public templateUrl: string;

		constructor() {
			this.bindings = {};
			this.controller = gameListsController;
			this.controllerAs = '$ctrl';
			this.templateUrl = '/templates/games/views/gamesList.html';
		}
	}

	angular
		.module('games')
		.component('gamesList', new gamesListComponent());
	
};
