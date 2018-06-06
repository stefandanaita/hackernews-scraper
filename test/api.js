import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import HackerNewsApi from 'lib/HackerNewsApi'

chai.use(chaiAsPromised)
const expect = chai.expect

describe('HackerNews API', () => {
    let api = null

    beforeEach(() => {
        api = new HackerNewsApi
    })

    // Testing the setters/getters
    describe('Core functionality', () => {
        it('should return the right default Base Url', () => {
            expect(api.apiUrl).to.equal('https://hacker-news.firebaseio.com/v0/')
        })

        it('should update the Base Url', () => {
            api.apiUrl = 'https://google.com'

            expect(api.apiUrl).to.equal('https://google.com')
        })

        it('should return the right default Top Stories Endpoint', () => {
            expect(api.topStoriesEndpoint).to.equal('topstories.json')
        })

        it('should update the Top Stories Endpoint', () => {
            api.topStoriesEndpoint = 'topstoriesUpdated.json'

            expect(api.topStoriesEndpoint).to.equal('topstoriesUpdated.json')
        })

        it('should return the right default Story Endpoint', () => {
            expect(api.storyEndpoint).to.equal('item/%i.json')
        })

        it('should update the Story Endpoint', () => {
            api.storyEndpoint = 'itemUpdated/%i.json'

            expect(api.storyEndpoint).to.equal('itemUpdated/%i.json')
        })
    })

    // Testing the Top Stories API Endpoint
    describe('Top stories', () => {
        it('should retrieve the top 5 stories', async () => {
            let stories = await api.retrieveTopStories(5)

            expect(stories).to.have.lengthOf(5)
        })

        it('should retrieve the top 20 stories', async () => {
            let stories = await api.retrieveTopStories(20)

            expect(stories).to.have.lengthOf(20)
        })

        it('should retrieve the top 100 stories', async () => {
            let stories = await api.retrieveTopStories(100)

            expect(stories).to.have.lengthOf(100)
        })

        it('should fail on wrong API Base URL', () => {
            // Override the API's base url
            let axiosInstance = api.axios
            axiosInstance.defaults.baseURL = 'https://google.com'
            api.axios = axiosInstance
            
            expect(api.retrieveTopStories(5)).to.be.rejected
        })

        it('should fail on wrong Top Stories Endpoint', () => {
            api.topStoriesEndpoint = 'topstoriesWrong.json'

            expect(api.retrieveTopStories(5)).to.be.rejected
        })
    })

    // Testing the Single Story API Endpoint
    describe('Detailed story', () => {
        it('should retrieve a specific story', async () => {
            expect(await api.retrieveStory(250)).to.include.all.keys('id', 'by', 'time')
        })

        it('should fail to retrieve a non existent story', () => {
            expect(api.retrieveStory(0)).to.be.empty
        })

        it('should fail when no Story ID provided', () => {
            expect(api.retrieveStory()).to.be.empty
        })
    })
})