///<reference path="../../../../main.d.ts" />
(function () {
    'use strict';
    /**
     * Renders icons according to 'option' paramteter passed via initialisation;
     * 'option' may be 'rock' / 'scissors' / 'paper'
     *
     * @class playerOptionAsIconDirective
     * @implements {ng.IDirective}
     */
    var playerOptionAsIconDirective = (function () {
        function playerOptionAsIconDirective() {
            this.scope = {
                'option': '='
            };
            this.template = "\n\t\t\t<i ng-if=\"option === 'rock'\" class=\"fa fa-hand-rock-o\" aria-hidden=\"true\"></i>\n\t\t\t<i ng-if=\"option === 'scissors'\" class=\"fa fa-hand-scissors-o\" aria-hidden=\"true\"></i>\n\t\t\t<i ng-if=\"option === 'paper'\" class=\"fa fa-hand-paper-o\" aria-hidden=\"true\"></i>";
        }
        playerOptionAsIconDirective.$inject = [];
        return playerOptionAsIconDirective;
    }());
    angular
        .module('games')
        .directive('playerOptionAsIcon', function () { return new playerOptionAsIconDirective(); });
})();
