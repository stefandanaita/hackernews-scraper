import * as Axios from 'axios'
import * as Util from 'util'

const DEFAULT_API_URL = 'https://hacker-news.firebaseio.com/v0/'
const DEFAULT_TOP_ENDPOINT = 'topstories.json'
const DEFAULT_STORY_ENDPOINT = 'item/%i.json'

/**
 * Class responsible with calling the Hacker News API
 *
 * The setters/getters methods allow the class
 * to be easily controlled and re-used without
 * requiring major code changes.
 */
export default class HackerNewsApi
{
    /**
     * Class variables assignment. Predefine them
     * with default values that can be overriden
     * later using the setters/getters.
     */
    constructor()
    {
        this._topStoriesEndpoint = DEFAULT_TOP_ENDPOINT
        this._storyEndpoint = DEFAULT_STORY_ENDPOINT

        // Axios instance to avoid initializing one for every detailed story request
        this._axios = Axios.create({
            baseURL: DEFAULT_API_URL,
            timeout: 5000
        })
    }

    /**
     * This function retrieves all the top stories and returns the
     * first <numberOfStories> required via the command line argument.
     *
     * @numberOfStories {Number} - The total number of jobs that will be returned
     * @callback {Function}
     */
    retrieveTopStories(numberOfStories, callback)
    {
        this._axios.get(this._topStoriesEndpoint)
            .then((res) => {
                callback(null, res.data.slice(0, numberOfStories))
            })
            .catch((err) => {
                callback(`The top stories could not be retrieved. ${err}`)
            })
    }

    /**
     * This function retrieves the detailed information about the
     * story with the ID <storyId> and returns it.
     *
     * @storyId {Number} - The ID of the requested story
     * @callback {Function}
     */
    retrieveStory(storyId, callback)
    {
        let endpoint = Util.format(this._storyEndpoint, storyId)

        this._axios.get(endpoint)
            .then((res) => {
                callback(null, res.data)
            })
            .catch((err) => {
                callback(`The story with the ID ${storyId} could not be retrieved. ${err}`)
            })
    }

    /**
     * This getter allows re-using Hacker News API
     * axios instance somewhere else in the code.
     */
    get axios()
    {
        return this._axios
    }

    get topStoriesEndpoint()
    {
        return this._topStoriesEndpoint
    }

    set topStoriesEndpoint(topStoriesEndpoint)
    {
        this._topStoriesEndpoint = topStoriesEndpoint
    }

    get storyEndpoint()
    {
        return this._storyEndpoint
    }

    set storyEndpoint(storyEndpoint)
    {
        this._storyEndpoint = storyEndpoint
    }
}