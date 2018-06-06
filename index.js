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
const main = async () => {
    const posts = args.posts

    // Validate the posts argument
    if (!posts || typeof posts !== 'number' || posts <= 0 || posts > 100) {
        console.error("Usage (node): NODE_PATH=build node ./build --posts n")
        console.error("Usage (docker): docker run scraper --posts n")
        console.info("The number of posts must be a positive integer smaller than 100.")

        return;
    }

    // Initialize the API and Processor classes
    const api = new HackerNewsApi()
    const processor = new StoryProcessor()

    let processed = []

    try {
        let stories = await api.retrieveTopStories(posts)
        let detailedStoriesRequests = stories.map((storyId) => api.retrieveStory(storyId))
        let detailedStories = await Promise.all(detailedStoriesRequests)

        processed = detailedStories.map(processor.process)
    } catch(err) {
        return console.log(err)
    }

    console.log(processed)
}

main()