///<reference path="../../../../main.d.ts" />

(function() {

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

		return function(value: number):string {
			var optionNumber:number = Number(value);
			var returnValue:string = '';
			if (optionNumber >= 0){
				GAME_OPTIONS_CONSTANTS.forEach((option) => {
					if (option.value === optionNumber){
						returnValue = option.label;
					}
				});
			}
			return returnValue;
		}

	}

	angular
		.module('games')
		.filter('gameOptionNumberToLabel', gameOptionNumberToLabel);

})();