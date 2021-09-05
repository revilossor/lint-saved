const getFileName = file => file.split('/').pop()
const { isMatch } = require('micromatch')
const { relative } = require('path')

module.exports = (actionMap, cache) => async file => {
  if (cache.has(file)) { return }

  const rel = relative(process.cwd(), file)
  console.info(`[lint-saved] 👀 "${rel}"`)

  cache.set(file)

  const filename = getFileName(file)
  actionMap.forEach((actions, pattern) => {
    if (isMatch(filename, pattern)) {
      // exec each command
    }
  })

  console.info(`[lint-saved] ✅ "${rel}"`)
}
