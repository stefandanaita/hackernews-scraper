'use strict';

var _commandLineArgs = require('command-line-args');

var _commandLineArgs2 = _interopRequireDefault(_commandLineArgs);

var _HackerNewsApi = require('lib/HackerNewsApi');

var _HackerNewsApi2 = _interopRequireDefault(_HackerNewsApi);

var _StoryProcessor = require('lib/StoryProcessor');

var _StoryProcessor2 = _interopRequireDefault(_StoryProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// CLI Args definition
var args = (0, _commandLineArgs2.default)([{
    name: 'posts',
    alias: 'p',
    type: Number
}]);

/**
 * Application's entry function
 */
var main = async function main() {
    var posts = args.posts;

    // Validate the posts argument
    if (!posts || typeof posts !== 'number' || posts <= 0 || posts > 100) {
        console.error("Usage (node): NODE_PATH=build node ./build --posts n");
        console.error("Usage (docker): docker run scraper --posts n");
        console.info("The number of posts must be a positive integer smaller than 100.");

        return;
    }

    // Initialize the API and Processor classes
    var api = new _HackerNewsApi2.default();
    var processor = new _StoryProcessor2.default();

    var processed = [];

    try {
        var stories = await api.retrieveTopStories(posts);
        var detailedStoriesRequests = stories.map(function (storyId) {
            return api.retrieveStory(storyId);
        });
        var detailedStories = await Promise.all(detailedStoriesRequests);

        processed = detailedStories.map(processor.process);
    } catch (err) {
        return console.log(err);
    }

    console.log(processed);
};

main();