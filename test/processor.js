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
})