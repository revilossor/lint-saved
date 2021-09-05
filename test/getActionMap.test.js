const getActionMap = require('../src/getActionMap')
const getPackageJson = require('../src/getPackageJson')

jest.mock('../src/getPackageJson')

describe('When I get an action map', () => {
  it('Then the package json is fetched', async () => {
    await getActionMap()
    expect(getPackageJson).toHaveBeenCalled()
  })
  describe('And the package json contains a "lint-staged" block', () => {
    it('Then the output map contains the entries from the "lint-staged" block', async () => {
      getPackageJson.mockResolvedValueOnce({
        'lint-staged': {
          'some-key': 'some-value'
        }
      })
      const map = await getActionMap()
      expect([...map.keys()]).toEqual(['some-key'])
      expect([...map.values()]).toEqual([['some-value']])
    })
    it('And string and array values are correctly spread into a flat array value', async () => {
      getPackageJson.mockResolvedValueOnce({
        'lint-staged': {
          'some-string-key': 'some-value',
          'some-array-key': ['some-other-value']
        }
      })
      const map = await getActionMap()
      expect([...map.keys()]).toEqual(['some-string-key', 'some-array-key'])
      expect([...map.values()]).toEqual([['some-value'], ['some-other-value']])
    })
  })
  describe('And the package json contains a "lint-saved" block', () => {
    it('Then the output map contains the entries from the "lint-saved" block', async () => {
      getPackageJson.mockResolvedValueOnce({
        'lint-saved': {
          'some-other-key': 'some-other-value'
        }
      })
      const map = await getActionMap()
      expect([...map.keys()]).toEqual(['some-other-key'])
      expect([...map.values()]).toEqual([['some-other-value']])
    })
  })
  describe('And the package json contains a "lint-saved" and a "lint-staged" block', () => {
    it('Then the output map contains the entries from both, with vale lists merged and deduped', async () => {
      getPackageJson.mockResolvedValueOnce({
        'lint-staged': {
          one: 'value-one',
          two: ['value-two-one', 'duplicate']
        },
        'lint-saved': {
          two: ['value-two-two', 'duplicate'],
          three: 'value-three'
        }
      })
      const map = await getActionMap()
      expect([...map.keys()]).toEqual(['one', 'two', 'three'])
      expect([...map.values()]).toEqual([['value-one'], ['value-two-one', 'duplicate', 'value-two-two'], ['value-three']])
    })
  })

  describe('And there is an error getting the package json', () => {
    it('Then the error is rejected', async () => {
      const error = new Error('some error form getPackageJson')
      getPackageJson.mockRejectedValue(error)
      await expect(getActionMap()).rejects.toThrow(error)
    })
  })
})
