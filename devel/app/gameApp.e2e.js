describe('Game application', () => {

	it('should have a title', () => {
		browser.get('http://localhost:8080/');
		expect(browser.getTitle()).toEqual('Rock Paper Scissors application');
	});
	

});