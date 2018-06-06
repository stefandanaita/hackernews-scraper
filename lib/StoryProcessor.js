import * as ValidUrl from 'valid-url'

/**
 * Class responsible with processing a Hacker News story
 *
 * The setters/getters methods allow the class
 * to be easily controlled and re-used without
 * requiring major code changes.
 */
export default class StoryProcessor
{
    _maxStringLength = 256
    _enforceMaxString = true
    _enforceValidUri = true

    /**
     * Class variables assignment. Predefine them
     * with default values that can be overriden
     * later using the setters/getters.
     *
     * @options <Object> - Processor options can be overriden using this object
     */
    constructor(options)
    {
        this.process = this.process.bind(this)

        // Override the options if requested
        if (options) {
            if (typeof options.enforceMaxString === 'boolean') {
                this.enforceMaxString = options.enforceMaxString
            }

            if (typeof options.maxStringLength === 'Number') {
                this.maxStringLength = options.maxStringLength
            }
            
            if (typeof options.enforceValidUri === 'boolean') {
                this.enforceValidUri = options.enforceValidUri
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
    process(story, index)
    {
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

        return processed
    }

    /**
     * This function processes the string if this operation is enforced
     * and returns the right formatted string.
     *
     * @str <String> - The string to be processed
     */
    stringProcessor(str)
    {
        if (this.enforceMaxString && str.length > this.maxStringLength) {
            return str.substring(0, this.maxStringLength)
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
        return !this.enforceValidUri || this.enforceValidUri && ValidUrl.isUri(uri)
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