///<reference path="../../../../main.d.ts" />

describe('Games', () => {

	let $scope;

	beforeEach(angular.mock.module('rpsApp'));

	beforeEach(inject($rootScope => {
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

	afterEach(() => {
		$scope.$apply();
	});

	describe('Service', () => {

		let GameService: IGameService;
		beforeEach(inject($injector => {
			GameService = $injector.get('GameService');
		}));
		
		var winGame:IGame = {
			computerOption: 'rock',
			playerOption: 'paper',
			timestamp: 0
		}

		it('should be present', () => {
			expect(GameService).toBeDefined();
		});

		it('should evaluate win/draw/lose correctly', () => {
			var winOrLostString = GameService.gameScoreFromPlayerPerspective(winGame);
			expect(winOrLostString).toEqual(1);
		});

	});
});