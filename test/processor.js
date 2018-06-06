import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import StoryProcessor from 'lib/StoryProcessor'

chai.use(chaiAsPromised)
const expect = chai.expect

describe('HackerNews Processor', () => {
    let processor = null

    beforeEach(() => {
        processor = new StoryProcessor
    })

    // Testing the Setters/Getters
    describe('Core functionality', () => {
        it('should return the right default Max String Length', () => {
            expect(processor.maxStringLength).to.equal(256)
        })

        it('should update the Max String Length', () => {
            processor.maxStringLength = 128

            expect(processor.maxStringLength).to.equal(128)
        })

        it('should return the right default Max String Enforce', () => {
            expect(processor.enforceMaxString).to.be.true
        })

        it('should update the Max String Enforce', () => {
            processor.enforceMaxString = false

            expect(processor.enforceMaxString).to.be.false
        })

        it('should return the right default Url Validation Enforce', () => {
            expect(processor.enforceValidUri).to.be.true
        })

        it('should update the Url Validation Enforce', () => {
            processor.enforceValidUri = false

            expect(processor.enforceValidUri).to.be.false
        })
    })

    // Testing the helper functions of the Processor class
    describe('Processor helper functions', () => {
        it('should validate the story numbers', () => {
            expect(processor.storyNumberValidator(5)).to.be.true
        })

        it('should invalidate the other types given instead of numbers', () => {
            expect(processor.storyNumberValidator('test')).to.be.false
        })

        it('should validate good urls', () => {
            expect(processor.uriValidator('https://google.com')).to.be.true
        })

        it('should invalidate wrong urls', () => {
            expect(processor.uriValidator('wrongurl')).to.be.false
        })

        it('should not validate urls when enforcing is off', () => {
            processor.enforceValidUri = false

            expect(processor.uriValidator('wrongurl')).to.be.true
        })

        it('should shorten the strings exceeding the limit', () => {
            processor.maxStringLength = 5

            expect(processor.stringProcessor('String with more than 5 characters.')).to.have.lengthOf(5)
        })

        it('should not shorten strings when enforcing is off', () => {
            processor.maxStringLength = 5
            processor.enforceMaxString = false

            expect(processor.stringProcessor('String with more than 5 characters.')).to.have.lengthOf(35)
        })
    })

    /*
     * Check that the processor as a whole works
     * Testing with longer title and negative score to
     * see the helper functions working
     */
    describe('Story Processor', () => {
        it('should return the right processed story', () => {
            processor.maxStringLength = 15

            let story = {
                by: "doener",
                descendants: 21,
                id: 17224382,
                kids : [ 17224620, 17224546, 17224543, 17224615, 17227084, 17224519, 17224479, 17224496, 17224531 ],
                score: -23,
                time: 1528083256,
                title: "If Github ends up selling itself one day, Microsoft will be the buyer (2014)",
                type: "story",
                url: "https://twitter.com/jasonfried/status/430871267881672704"
            }

            expect(processor.process(story, 5)).to.deep.equal({
                title: "If Github ends ",
                author: "doener",
                rank: 6,
                uri: "https://twitter.com/jasonfried/status/430871267881672704",
                comments: 21
            })
        })
    })
})