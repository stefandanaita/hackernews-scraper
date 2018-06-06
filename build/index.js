'use strict';

var _async = require('async');

var Async = _interopRequireWildcard(_async);

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _HackerNewsApi = require('lib/HackerNewsApi');

var _HackerNewsApi2 = _interopRequireDefault(_HackerNewsApi);

var _StoryProcessor = require('lib/StoryProcessor');

var _StoryProcessor2 = _interopRequireDefault(_StoryProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// CLI Args definition
var args = (0, _commandLineArgs2.default)([{
    name: 'posts',
    alias: 'p',
    type: Number
}]);

/**
 * Application's entry function
 */
var main = function main() {
    var posts = args.posts;

    // Validate the posts argument
    if (!posts || typeof posts !== 'number' || posts <= 0 || posts > 100) {
        console.error("Usage: NODE_PATH=build node ./build --posts n");
        console.info("The number of posts must be a positive integer smaller than 100.");

        return;
    }

    // Initialize the API and Processor classes
    var api = new _HackerNewsApi2.default(),
        processor = new _StoryProcessor2.default();

    /*
     * Synchronous waterfall through the scraper's steps
     * 1) Top stories retrieval
     * 2) Asynchronously retrieval of each story's detailed info 
     * 3) Asynchronously processing of each story retrieved above
     */
    Async.waterfall([

    // Retrieve top stories using the API class
    function (callback) {
        api.retrieveTopStories(posts, function (err, stories) {
            if (err) {
                return callback(err);
            }

            callback(null, stories);
        });
    },

    // Retrieve each story's detailed info using the same API class instance
    function (stories, callback) {
        Async.map(stories, function (storyId, callback) {
            api.retrieveStory(storyId, callback);
        }, function (err, detailedStories) {
            if (err) {
                return callback(err);
            }

            callback(null, detailedStories);
        });
    },

    // Process the stories
    function (detailedStories, callback) {
        Async.mapValues(detailedStories, function (story, index, callback) {
            processor.process(index, story, callback);
        }, function (err, processed) {
            if (err) {
                return callback(err);
            }

            callback(null, processed);
        });
    }], function (err, processedStories) {
        // Single error displaying point
        if (err) {
            return console.log(err);
        }

        // Display the final array of stories
        console.log(Object.values(processedStories));
    });
};

main();