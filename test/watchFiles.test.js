const nodemon = require('nodemon')
const watchFiles = require('../src/watchFiles')

jest.mock('nodemon')

const on = jest.fn()

nodemon.mockReturnValue(({
  on
}))

const callback = jest.fn()

describe('When I watch files', () => {
  it('Then nodemon is started with the expected options', () => {
    watchFiles(callback)
    expect(nodemon).toHaveBeenCalledWith({
      exec: ':',
      ext: 'md,json,js,ts,jsx,tsx'
    })
  })
  it('And a restart handler is attached', () => {
    watchFiles(callback)
    expect(on).toHaveBeenCalledWith('restart', expect.any(Function))
  })
})

describe('When a restart event is dispatched', () => {
  it('Then the passed callback is invoked once for each changed file', async () => {
    let handler
    on.mockImplementationOnce((_, cb) => {
      handler = cb
    })
    watchFiles(callback)
    expect(handler).toBeDefined()
    const filesChanged = [
      'one',
      'two',
      'three'
    ]
    await handler(filesChanged)
    filesChanged.forEach(file => {
      expect(callback).toHaveBeenCalledWith(file)
    })
    expect(callback).toHaveBeenCalledTimes(filesChanged.length)
  })
})
