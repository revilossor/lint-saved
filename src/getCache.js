module.exports = cacheTime => {
  const cache = new Map()

  return {
    has: item => {
      const cachedAt = cache.get(item)
      return typeof (cachedAt) === 'undefined'
        ? false
        : Date.now() <= cachedAt + cacheTime
    },
    set: item => {
      const timestamp = Date.now()
      cache.set(item, timestamp)
    }
  }
}
