import { should, expect } from 'chai'
import HackerNewsApi from 'lib/HackerNewsApi'

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
})