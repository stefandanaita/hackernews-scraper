'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validUrl = require('valid-url');

var ValidUrl = _interopRequireWildcard(_validUrl);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_MAX_STRING_LENGTH = 256;
var DEFAULT_ENFORCE_MAX_STRING = true;
var DEFAULT_ENFORCE_VALID_URI = true;

/**
 * Class responsible with processing a Hacker News story
 *
 * The setters/getters methods allow the class
 * to be easily controlled and re-used without
 * requiring major code changes.
 */

var StoryProcessor = function () {
    /**
     * Class variables assignment. Predefine them
     * with default values that can be overriden
     * later using the setters/getters.
     *
     * @options <Object> - Processor options can be overriden using this object
     */
    function StoryProcessor(options) {
        _classCallCheck(this, StoryProcessor);

        // Initialize processor options with their defaults
        this._maxStringLength = DEFAULT_MAX_STRING_LENGTH;
        this._enforceMaxString = DEFAULT_ENFORCE_MAX_STRING;
        this._enforceValidUri = DEFAULT_ENFORCE_VALID_URI;

        // Override the options if requested
        if (options) {
            if (typeof options.enforceMaxString === 'boolean') {
                this._enforceMaxString = options.enforceMaxString;
            }

            if (options.maxStringLength) {
                this._maxStringLength = options.maxStringLength;
            }

            if (typeof options.enforceValidUri === 'boolean') {
                this._enforceValidUri = options.enforceValidUri;
            }
        }
    }

    /**
     * This function manipulates the retrieved detailed story
     * and builds a new object according to the right format.
     *
     * @index <Number> - The index of the story in the retrieved Top Stories array
     * @story <Object> - The raw object of the detailed story retrieved
     * @callback <Function>
     */


    _createClass(StoryProcessor, [{
        key: 'process',
        value: function process(index, story, callback) {
            try {
                var processed = {
                    title: this.stringProcessor(story.title),
                    author: this.stringProcessor(story.by),
                    rank: index + 1
                };

                if (this.uriValidator(story.url)) {
                    processed.uri = story.url;
                }

                if (this.storyNumberValidator(story.score)) {
                    processed.points = story.score;
                }

                if (this.storyNumberValidator(story.descendants)) {
                    processed.comments = story.descendants;
                }

                return callback(null, processed);
            } catch (err) {
                return callback(err);
            }
        }

        /**
         * This function processes the string if this operation is enforced
         * and returns the right formatted string.
         *
         * @str <String> - The string to be processed
         */

    }, {
        key: 'stringProcessor',
        value: function stringProcessor(str) {
            if (this._enforceMaxString && str.length > this._maxStringLength) {
                return str.substring(0, this._maxStringLength);
            }

            return str;
        }

        /**
         * This function validates the URI. It returns true if
         * the URI is valid or if the validation is not enforced and
         * false if the validation is enforced, but the URI is invalid
         *
         * @uri <String> - The URI to be validated
         */

    }, {
        key: 'uriValidator',
        value: function uriValidator(uri) {
            return !this._enforceValidUri || this._enforceValidUri && ValidUrl.isUri(uri);
        }

        /**
         * This function validates the number attributes of the story
         * Returns true only when the @value is an unsigned integer.
         *
         * @value <Number> - Number to be validated
         */

    }, {
        key: 'storyNumberValidator',
        value: function storyNumberValidator(value) {
            return typeof value === 'number' && value >= 0;
        }
    }, {
        key: 'enforceMaxString',
        get: function get() {
            return this._enforceMaxString;
        },
        set: function set(enforceMaxString) {
            this._enforceMaxString = enforceMaxString;
        }
    }, {
        key: 'maxStringLength',
        get: function get() {
            return this._maxStringLength;
        },
        set: function set(maxStringLength) {
            this._maxStringLength = maxStringLength;
        }
    }, {
        key: 'enforceValidUri',
        get: function get() {
            return this._enforceValidUri;
        },
        set: function set(enforceValidUri) {
            this._enforceValidUri = enforceValidUri;
        }
    }]);

    return StoryProcessor;
}();

exports.default = StoryProcessor;