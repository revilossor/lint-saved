// module for restart handler - needs action map, cache
// - when invoked
//    - if bad, does nothing
//    - if good
//        - logs start
//        - sets cache
//        - matches every rule pattern against filename
//            - if match, executes all
//            - if not, does nothing
//        - logs end

const getFileChangeHandler = require('../src/getFileChangeHandler')
const micromatch = require('micromatch')

jest.mock('micromatch')

const cache = {
  has: jest.fn(),
  set: jest.fn()
}

console.info = jest.fn()
process.cwd = jest.fn(() => '/file')

const file = '/file/path/filename'

describe('Given a file change handler, initialised with an action map and a cache', () => {
  describe('When the handler is invoked with a file', () => {
    it('Then the cache is checked for the file', async () => {
      const handler = getFileChangeHandler(new Map(), cache)
      await handler(file)
      expect(cache.has).toHaveBeenCalledWith(file)
    })

    describe('When the file is cached', () => {
      it('Then nothing happens', async () => {
        cache.has.mockReturnValueOnce(true)
        const handler = getFileChangeHandler(new Map(), cache)
        await handler(file)
        expect(console.info).not.toHaveBeenCalled()
        expect(cache.set).not.toHaveBeenCalled()
      })
    })

    describe('When the file is not cached', () => {
      beforeEach(async () => {
        cache.has.mockReturnValueOnce(false)
        const actionMap = new Map()
        actionMap.set('somepattern', ['somevalue'])
        actionMap.set('someotherpattern', ['somevalue'])
        const handler = getFileChangeHandler(actionMap, cache)
        await handler(file)
      })

      it('Then a message about the file change is logged, with a relative path', () => {
        expect(console.info).toHaveBeenCalledWith('[lint-saved] 👀 "path/filename"') // TODO timestamp?
      })

      it('And the item is set in the cache', () => {
        expect(cache.set).toHaveBeenCalledWith(file)
      })

      it('And every file name is checked for matches against each action map key', () => {
        expect(micromatch.isMatch).toHaveBeenCalledWith('filename', 'somepattern')
        expect(micromatch.isMatch).toHaveBeenCalledWith('filename', 'someotherpattern')
      })

      // TODO when there is a match
      //    command executed with filename at the end.

      it('Then an informative message about processing complete is logged', () => {
        expect(console.info).toHaveBeenCalledWith('[lint-saved] ✅ "path/filename"')
      })
    })
  })
})
