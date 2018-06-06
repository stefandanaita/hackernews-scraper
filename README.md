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

The double dashes `--` in the `npm start -- --posts n` are necessary so that the arguments is passed to the command.


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

    docker build -t hackernews-scraper-test -f Dockerfile.test .

Alternatively, you can just run

    npm run docker-build-test


#### Execute

To run the tests inside Docker, run

    docker run hackernews-scraper-test

Or straight

    npm run docker-test

