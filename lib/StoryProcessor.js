import * as ValidUrl from 'valid-url'

const DEFAULT_MAX_STRING_LENGTH = 256
const DEFAULT_ENFORCE_MAX_STRING = true
const DEFAULT_ENFORCE_VALID_URI = true

/**
 * Class responsible with processing a Hacker News story
 *
 * The setters/getters methods allow the class
 * to be easily controlled and re-used without
 * requiring major code changes.
 */
export default class StoryProcessor
{
    /**
     * Class variables assignment. Predefine them
     * with default values that can be overriden
     * later using the setters/getters.
     *
     * @options <Object> - Processor options can be overriden using this object
     */
    constructor(options)
    {
        // Initialize processor options with their defaults
        this._maxStringLength = DEFAULT_MAX_STRING_LENGTH
        this._enforceMaxString = DEFAULT_ENFORCE_MAX_STRING
        this._enforceValidUri = DEFAULT_ENFORCE_VALID_URI

        // Override the options if requested
        if (options) {
            if (typeof options.enforceMaxString === 'boolean') {
                this._enforceMaxString = options.enforceMaxString
            }

            if (options.maxStringLength) {
                this._maxStringLength = options.maxStringLength
            }
            
            if (typeof options.enforceValidUri === 'boolean') {
                this._enforceValidUri = options.enforceValidUri
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
    process(index, story, callback)
    {
        try {
            let processed = {
                title: this.stringProcessor(story.title),
                author: this.stringProcessor(story.by),
                rank: index + 1
            }

            if (this.uriValidator(story.url)) {
                processed.uri = story.url
            }

            if (this.storyNumberValidator(story.score)) {
                processed.points = story.score
            }

            if (this.storyNumberValidator(story.descendants)) {
                processed.comments = story.descendants
            }

            return callback(null, processed)
        } catch (err) {
            return callback(err)
        }
    }

    /**
     * This function processes the string if this operation is enforced
     * and returns the right formatted string.
     *
     * @str <String> - The string to be processed
     */
    stringProcessor(str)
    {
        if (this._enforceMaxString && str.length > this._maxStringLength) {
            return str.substring(0, this._maxStringLength)
        }

        return str
    }

    /**
     * This function validates the URI. It returns true if
     * the URI is valid or if the validation is not enforced and
     * false if the validation is enforced, but the URI is invalid
     *
     * @uri <String> - The URI to be validated
     */
    uriValidator(uri)
    {
        return !this._enforceValidUri || this._enforceValidUri && ValidUrl.isUri(uri)
    }

    /**
     * This function validates the number attributes of the story
     * Returns true only when the @value is an unsigned integer.
     *
     * @value <Number> - Number to be validated
     */
    storyNumberValidator(value)
    {
        return typeof value === 'number' && value >= 0
    }

    get enforceMaxString()
    {
        return this._enforceMaxString
    }

    set enforceMaxString(enforceMaxString)
    {
        this._enforceMaxString = enforceMaxString
    }

    get maxStringLength()
    {
        return this._maxStringLength
    }

    set maxStringLength(maxStringLength)
    {
        this._maxStringLength = maxStringLength
    }

    get enforceValidUri()
    {
        return this._enforceValidUri
    }

    set enforceValidUri(enforceValidUri)
    {
        this._enforceValidUri = enforceValidUri
    }
}