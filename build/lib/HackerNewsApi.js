'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var Axios = _interopRequireWildcard(_axios);

var _util = require('util');

var Util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_API_URL = 'https://hacker-news.firebaseio.com/v0/';
var DEFAULT_TOP_ENDPOINT = 'topstories.json';
var DEFAULT_STORY_ENDPOINT = 'item/%i.json';

/**
 * Class responsible with calling the Hacker News API
 *
 * The setters/getters methods allow the class
 * to be easily controlled and re-used without
 * requiring major code changes.
 */

var HackerNewsApi = function () {
    /**
     * Class variables assignment. Predefine them
     * with default values that can be overriden
     * later using the setters/getters.
     */
    function HackerNewsApi() {
        _classCallCheck(this, HackerNewsApi);

        this._topStoriesEndpoint = DEFAULT_TOP_ENDPOINT;
        this._storyEndpoint = DEFAULT_STORY_ENDPOINT;

        // Axios instance to avoid initializing one for every detailed story request
        this._axios = Axios.create({
            baseURL: DEFAULT_API_URL,
            timeout: 5000
        });
    }

    /**
     * This function retrieves all the top stories and returns the
     * first <numberOfStories> required via the command line argument.
     *
     * @numberOfStories {Number} - The total number of jobs that will be returned
     * @callback {Function}
     */


    _createClass(HackerNewsApi, [{
        key: 'retrieveTopStories',
        value: function retrieveTopStories(numberOfStories, callback) {
            this._axios.get(this._topStoriesEndpoint).then(function (res) {
                callback(null, res.data.slice(0, numberOfStories));
            }).catch(function (err) {
                callback('The top stories could not be retrieved. ' + err);
            });
        }

        /**
         * This function retrieves the detailed information about the
         * story with the ID <storyId> and returns it.
         *
         * @storyId {Number} - The ID of the requested story
         * @callback {Function}
         */

    }, {
        key: 'retrieveStory',
        value: function retrieveStory(storyId, callback) {
            var endpoint = Util.format(this._storyEndpoint, storyId);

            this._axios.get(endpoint).then(function (res) {
                callback(null, res.data);
            }).catch(function (err) {
                callback('The story with the ID ' + storyId + ' could not be retrieved. ' + err);
            });
        }

        /**
         * This getter allows re-using Hacker News API
         * axios instance somewhere else in the code.
         */

    }, {
        key: 'axios',
        get: function get() {
            return this._axios;
        }
    }, {
        key: 'topStoriesEndpoint',
        get: function get() {
            return this._topStoriesEndpoint;
        },
        set: function set(topStoriesEndpoint) {
            this._topStoriesEndpoint = topStoriesEndpoint;
        }
    }, {
        key: 'storyEndpoint',
        get: function get() {
            return this._storyEndpoint;
        },
        set: function set(storyEndpoint) {
            this._storyEndpoint = storyEndpoint;
        }
    }]);

    return HackerNewsApi;
}();

exports.default = HackerNewsApi;