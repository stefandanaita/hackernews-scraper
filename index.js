import { waterfall, map, mapValues } from 'async'
import CmdArgs from 'command-line-args'
import HackerNewsApi from 'lib/HackerNewsApi'
import StoryProcessor from 'lib/StoryProcessor'

// CLI Args definition
const args = CmdArgs([
    {
        name: 'posts',
        alias: 'p',
        type: Number
    }
])

/**
 * Application's entry function
 */
const main = () => {
    let posts = args.posts

    // Validate the posts argument
    if (!posts || typeof posts !== 'number' || posts <= 0 || posts > 100) {
        console.error("Usage (node): NODE_PATH=build node ./build --posts n")
        console.error("Usage (docker): docker run scraper --posts n")
        console.info("The number of posts must be a positive integer smaller than 100.")

        return;
    }

    // Initialize the API and Processor classes
    let
        api = new HackerNewsApi(),
        processor = new StoryProcessor()

    /*
     * Synchronous waterfall through the scraper's steps
     * 1) Top stories retrieval
     * 2) Asynchronously retrieval of each story's detailed info 
     * 3) Asynchronously processing of each story retrieved above
     */
    waterfall([

        // Retrieve top stories using the API class
        (callback) => {
            api.retrieveTopStories(posts, (err, stories) => {
                if (err) {
                    return callback(err)
                }

                callback(null, stories)
            })
        },

        // Retrieve each story's detailed info using the same API class instance
        (stories, callback) => {
            map(stories, (storyId, callback) => { api.retrieveStory(storyId, callback) }, (err, detailedStories) => {
                if (err) {
                    return callback(err)
                }

                callback(null, detailedStories)
            })
        },

        // Process the stories
        (detailedStories, callback) => {
            mapValues(detailedStories, (story, index, callback) => { processor.process(index, story, callback) }, (err, processed) => {
                if (err) {
                    return callback(err)
                }

                callback(null, processed)
            })
        }
    ], (err, processedStories) => {
        // Single error displaying point
        if (err) {
            return console.log(err)
        }

        // Display the final array of stories
        console.log(Object.values(processedStories))
    });
}

main()