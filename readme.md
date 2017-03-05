## Synopsis
Application in Angular 1.6 that allows player to play Rock Paper Scissors with Computer opponent.

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
Not completed. There are more scenarios that needs to be tested:
* Playing the actual game and see if the results are showing correctly

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
Not completed. Will be extended after the Firebase problem with testing will be solved (see Known Issues).

```
npm install setup
npm run karma
```

## Known Issues
* AngularFire typescript definition file is not correct. There is an error during compilation of the AngularFire.
* There is an error in unit test that points to the firebase beeing initialised multiple times.

## Contributors
lukaskalcok@gmail.com (Lukas Kalcok)


