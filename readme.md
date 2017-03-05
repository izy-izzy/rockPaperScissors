## Synopsis
Application in Angular 1.6 that allows player to play Rock Paper Scissors with a computer as an opponent.

## Installation and start
```
npm run setup
node httpserver.js (for local HTTP server)
```

Access in browser http://localhost:8080

## Requirements
Ruby, Ruby gem, NodeJS, JAVA SDK 1.8, Firebase 

## Demo
http://rps.lukaskalcok.com

## Technology
Angular.js (1.6+), GULP, CSS3, SCSS, HTML5, Karma, Jasmine, Protractor, Firebase

## Tests

### E2E tests
Not completed. There are more scenarios that need to be tested:
* Playing the actual game and see if the results are showing correctly.

Install JDK 1.8 according to OS.

Install Ruby according to OS.

```
npm run setup
node httpserver.js (for local HTTP server) (run on a separate console)
npm run e2e 
```

Another way is to run server in a separate console and protractor in a separate console.

console 1:
```
webdriver-manager start
```

console 2:
```
protractor
```

### Unit tests
Not completed. Will be extended after the Firebase problem with testing will be solved (see Known issues).

```
npm install setup
npm run karma
```

## Known problems or possible enhancements
* Two players game is not supported at the moment. This can be solved by extending the application so it will allow user to select an option if game should be a split screen or multiplayer. 
* Application does not utlilise any authentification at all. As Firebase supports the authentification it is not a problem to extend this functionality.
* UI may support key-binding for creating/deleting and playing the game so the user does not have to play with mouse only.
* Overall score is easy to compute from the current implementation.
* Statistics as charts may be used to visualise player's decissions.

## Quality/Maintanable solution 
* Good architecture of a whole application.
* Unit and E2E test for maintaing the solution.
* Typescript, Linters for HTML, SCSS will prevent a lot of unnecessary problems.
* Extendable SCSS will allow quick changes in CSS files.
* Documentation of code.
* Usage of CSS framework.

## Known issues
* AngularFire typescript definition file is not correct. There is an error during compilation of the AngularFire.
* There is an error in a unit test that points to the firebase beeing initialised multiple times.

## Contributors
lukaskalcok@gmail.com (Lukas Kalcok)


