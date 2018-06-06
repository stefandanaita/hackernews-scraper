import { create as AxiosCreate } from 'axios'
import { format as UtilFormat } from 'util'

/**
 * Class responsible with calling the Hacker News API
 */
export default class HackerNewsApi
{
    _topStoriesEndpoint = 'topstories.json'
    _storyEndpoint = 'item/%i.json'
    _apiUrl = 'https://hacker-news.firebaseio.com/v0/'
    _axios = null

    /**
     * Class variables assignment. Predefine them
     * with default values that can be overriden
     * later using the setters/getters.
     */
    constructor()
    {
        // Axios instance to avoid initializing one for every detailed story request
        this.axios = AxiosCreate({
            baseURL: this.apiUrl,
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
        this.axios.get(this.topStoriesEndpoint)
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
        let endpoint = UtilFormat(this.storyEndpoint, storyId)

        this.axios.get(endpoint)
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

    set axios(axios)
    {
        this._axios = axios
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

    get apiUrl()
    {
        return this._apiUrl
    }

    set apiUrl(apiUrl)
    {
        this._apiUrl = apiUrl
    }
}