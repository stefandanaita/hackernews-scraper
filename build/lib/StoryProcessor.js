'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validUrl = require('valid-url');

var ValidUrl = _interopRequireWildcard(_validUrl);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        this._maxStringLength = 256;
        this._enforceMaxString = true;
        this._enforceValidUri = true;

        this.process = this.process.bind(this);

        // Override the options if requested
        if (options) {
            if (typeof options.enforceMaxString === 'boolean') {
                this.enforceMaxString = options.enforceMaxString;
            }

            if (typeof options.maxStringLength === 'Number') {
                this.maxStringLength = options.maxStringLength;
            }

            if (typeof options.enforceValidUri === 'boolean') {
                this.enforceValidUri = options.enforceValidUri;
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
        value: function process(story, index) {
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

            return processed;
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
            if (this.enforceMaxString && str.length > this.maxStringLength) {
                return str.substring(0, this.maxStringLength);
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
            if (this.enforceValidUri) {
                return typeof ValidUrl.isUri(uri) !== 'undefined';
            }

            return true;
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