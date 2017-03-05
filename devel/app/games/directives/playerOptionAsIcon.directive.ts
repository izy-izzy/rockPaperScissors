///<reference path="../../../../main.d.ts" />

(function() {

	'use strict';
		
	/**
	 * Renders icons according to 'option' paramteter passed via initialisation;
	 * 'option' may be 'rock' / 'scissors' / 'paper'
	 * 
	 * @class playerOptionAsIconDirective
	 * @implements {ng.IDirective}
	 */
	class playerOptionAsIconDirective implements ng.IDirective {

		static $inject = [];
		
		constructor(){}

		restrict: 'E';

		scope:any = {
			'option': '='
		}

		template:string = `
			<i ng-if="option === 'rock'" class="fa fa-hand-rock-o" aria-hidden="true"></i>
			<i ng-if="option === 'scissors'" class="fa fa-hand-scissors-o" aria-hidden="true"></i>
			<i ng-if="option === 'paper'" class="fa fa-hand-paper-o" aria-hidden="true"></i>`;
	}

	angular
		.module('games')
		.directive('playerOptionAsIcon', () => new playerOptionAsIconDirective());

})();
