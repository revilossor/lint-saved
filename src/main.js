const getActionMap = require('./getActionMap')
const getCache = require('./getCache')
const getFileChangeHandler = require('./getFileChangeHandler')
const watchFiles = require('./watchFiles')

const CACHE_TIME = 5000

module.exports = async () => {
  const map = await getActionMap()
  const cache = getCache(CACHE_TIME)
  const handler = getFileChangeHandler(map, cache)
  watchFiles(handler)
}
