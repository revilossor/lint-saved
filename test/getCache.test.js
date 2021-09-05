const getCache = require('../src/getCache')

const cacheTime = 5000
const someFile = 'some-file'

Date.now = jest.fn()

describe('Given a cache initialised with a cache time', () => {
  describe('When I set an item in the cache', () => {
    it('Then the item is stored with the current timestamp', () => {
      const set = jest.spyOn(Map.prototype, 'set')
      const cache = getCache(cacheTime)
      Date.now.mockReturnValueOnce(999)
      cache.set(someFile)
      expect(set).toHaveBeenCalledWith(someFile, 999)
    })
  })

  describe('When I check if the cache has an item', () => {
    describe('And the item has never been cached', () => {
      it('Then false is returned', () => {
        const cache = getCache(cacheTime)
        expect(cache.has(someFile)).toBe(false)
      })
    })
    describe('And the item has been cached, but it has expired', () => {
      it('Then false is returned', () => {
        const cache = getCache(cacheTime)
        Date.now.mockReturnValueOnce(0)
        cache.set(someFile)
        Date.now.mockReturnValueOnce(cacheTime + 1)
        expect(cache.has(someFile)).toBe(false)
      })
    })
    describe('And the item has been cached recently', () => {
      it('Then true is returned', () => {
        const cache = getCache(cacheTime)
        Date.now.mockReturnValueOnce(0)
        cache.set(someFile)
        Date.now.mockReturnValueOnce(cacheTime - 1)
        expect(cache.has(someFile)).toBe(true)
      })
    })
  })
})
