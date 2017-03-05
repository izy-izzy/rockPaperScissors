describe('GamesList', () => {

	it('should be able to add game.', () => {
		browser.get('http://localhost:8080/');

		var EC = protractor.ExpectedConditions;
		var addNewGame = element(by.css('[data-e2e="add-new-game"]'));
		var isClickable = EC.elementToBeClickable(addNewGame);
		browser.wait(isClickable, 1000);
		addNewGame.click();

		var games = element.all(by.css('.game'));
		browser.sleep(5000);
		expect(games.count()).toBeGreaterThan(0);

	});

	it('should be able to remove all games.', () => {
		browser.get('http://localhost:8080/');

		var EC = protractor.ExpectedConditions;
		var removeAllGames = element(by.css('[data-e2e="remove-all-games"]'));
		var isClickable = EC.elementToBeClickable(removeAllGames);
		browser.wait(isClickable, 1000);
		removeAllGames.click();

		var games = element.all(by.css('.game'));
		browser.sleep(5000);
		expect(games.count()).toEqual(0);

	});
	
});