Hacker News Scraper
=================== 

Small CLI based JavaScript application that retrieves the most rated recent stories from [Hacker News](https://news.ycombinator.com/) and displays them as **JSON** in your Terminal. It expects the desired number of stories *(up to 100)* as its only argument.

The application is using the [official Hacker News API](https://github.com/HackerNews/API) as its source of information, manipulates the extracted data and returns it in the required format.



# Installation

The application can be run on top of a **Docker** container or straight away using NPM.

Firstly, checkout the repository and `cd` into the root folder.


## Node

For production installation only, run following command

    npm install --only-production


## Docker

To setup the Docker container, please run

    docker build -t hackernews-scraper ./

Alternatively, you can also use the NPM scripts shortcut

    npm run docker-build




# Usage

Depending on the installation option chosen above, you can run the application using


## Node

    NODE_PATH=build node build/ --posts n

Or via the NPM scripts

    npm start -- --posts n

The double dashes `--` in the `npm start -- --posts n` are necessary so that the argument is passed to the command.


## Docker

    docker run hackernews-scraper --posts n

Or via the NPM scripts

    npm run docker-start -- --posts n



# Testing

To run the application's tests, you either need to install the dev dependencies or use the testing docker container.


## Node

To install the dev dependencies and execute the tests, run
    
    npm install
    npm test


## Docker

#### Setup

To setup the testing Docker container, run

    docker build -t hackernews-scraper-test -f Dockerfile.test ./

Alternatively, you can just run

    npm run docker-build-test


#### Execute

To run the tests inside Docker, run

    docker run hackernews-scraper-test

Or straight

    npm run docker-test



# Libraries

A small number of external libraries were used for the *production* usage

- [command-line-args](https://www.npmjs.com/package/command-line-args) to get the number of posts argument
- [axios](https://www.npmjs.com/package/axios) to send the `GET` requests to the [Hacker News API](https://github.com/HackerNews/API)
- [util](https://nodejs.org/api/util.html) *(internal node library)* to nicely inject the `storyId` into the request endpoint
- [valid-url](https://www.npmjs.com/package/valid-url) to validate the URLs

For development purposes, the following libraries were used

- [Babel](http://babeljs.io) to compile the **ES6** JavaScript code
- [Mocha](https://mochajs.org) and [Chai](http://chaijs.com) for testing
- [babel-register](https://www.npmjs.com/package/babel-register) to compile the `ES6` test files on the fly
- [rimraf](https://www.npmjs.com/package/rimraf) to remove the `build` folder when the application is rebuilt

The application code is written using ES6 Classes, async/await and respects the single responsibility principle which is making it easy to maintain or further develop.
