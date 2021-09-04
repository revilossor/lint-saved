const { access, F_OK } = require('fs')
const getPackageJson = require('../src/getPackageJson')

const mockCWD = '/mock/path'
const mockPackageJson = {
  mock: 'package.json'
}

process.cwd = jest.fn(() => mockCWD)

jest.mock('fs')
jest.mock('/mock/path/package.json', () => mockPackageJson, { virtual: true })

describe('When I get the package json', () => {
  describe('And the current working directory contains a package json', () => {
    it('Then it is returned', async () => {
      access.mockImplementationOnce((_, __, callback) => {
        callback()
      })
      await expect(getPackageJson()).resolves.toEqual(mockPackageJson)
    })
  })

  describe('And there is no package.json in the current working directory', () => {
    it('Then an informative error is thrown', async () => {
      const error = new Error('nope')
      access.mockImplementationOnce((_, __, callback) => {
        callback(error)
      })
      await expect(getPackageJson()).rejects.toThrow(`Error looking for a package.json in "${mockCWD}": ${error.message}`)
      expect(access).toHaveBeenCalledWith(`${mockCWD}/package.json`, F_OK, expect.any(Function))
    })
  })
})
