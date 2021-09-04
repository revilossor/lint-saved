const requireDisabled = () => jest.isolateModules(() => {
  require('../src/disabled')
})

describe('When I require "disabled.js"', () => {
  it('Then an informative error is thrown', () => {
    const expected = new Error('lint-saved should only be used from the cli')
    expect(() => requireDisabled()).toThrow(expected)
  })
})
