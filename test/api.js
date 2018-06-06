import chai from 'chai'
import HackerNewsApi from 'lib/HackerNewsApi'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const expect = chai.expect

describe('HackerNewsApi', () => {
    let api = null

    beforeEach(() => {
        api = new HackerNewsApi
    })

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
})