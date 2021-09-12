const getFileChangeHandler = require('../src/getFileChangeHandler')
const execute = require('../src/execute')
const micromatch = require('micromatch')

jest.mock('../src/execute')
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
        expect(micromatch.isMatch).not.toHaveBeenCalled()
        expect(execute).not.toHaveBeenCalled()
      })
    })

    describe('When the file is not cached', () => {
      beforeEach(async () => {
        cache.has.mockReturnValueOnce(false)
        micromatch.isMatch
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true)
        const actionMap = new Map()
        actionMap.set('somepattern', ['somevalue'])
        actionMap.set('someotherpattern', ['first command', 'second command'])
        const handler = getFileChangeHandler(actionMap, cache)
        await handler(file)
      })

      it('Then the item is set in the cache', () => {
        expect(cache.set).toHaveBeenCalledWith(file)
      })

      it('And every file name is checked for matches against each action map key', () => {
        expect(micromatch.isMatch).toHaveBeenCalledWith('filename', 'somepattern')
        expect(micromatch.isMatch).toHaveBeenCalledWith('filename', 'someotherpattern')
      })

      it('And all commands from all matching actions are executed with the file appended', () => {
        expect(execute).toHaveBeenCalledWith('first command', file)
        expect(execute).toHaveBeenCalledWith('second command', file)
      })
    })
  })
})
