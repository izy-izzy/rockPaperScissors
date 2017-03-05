///<reference path="../../../../main.d.ts" />
describe('Games', function () {
    var $scope;
    beforeEach(angular.mock.module('rpsApp'));
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
        var firebaseConfig = {
            apiKey: "AIzaSyAOF-hOicGYwQWz3-qqLpvMO4gzASgXFT8",
            authDomain: "rockpaperscissors-544fc.firebaseapp.com",
            databaseURL: "https://rockpaperscissors-544fc.firebaseio.com/",
            storageBucket: "",
            messagingSenderId: "",
        };
        firebase.initializeApp(firebaseConfig);
    }));
    afterEach(function () {
        $scope.$apply();
    });
    describe('Service', function () {
        var GameService;
        beforeEach(inject(function ($injector) {
            GameService = $injector.get('GameService');
        }));
        var winGame = {
            computerOption: 'rock',
            playerOption: 'paper',
            timestamp: 0
        };
        it('should be present', function () {
            expect(GameService).toBeDefined();
        });
        it('should evaluate win/draw/lose correctly', function () {
            var winOrLostString = GameService.gameScoreFromPlayerPerspective(winGame);
            expect(winOrLostString).toEqual(1);
        });
    });
});
