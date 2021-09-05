const getFileName = file => file.split('/').pop()
const { isMatch } = require('micromatch')
const { relative } = require('path')
const execute = require('./execute')

module.exports = (actionMap, cache) => async file => {
  if (cache.has(file)) { return }

  const rel = relative(process.cwd(), file)
  console.info(`[lint-saved] 👀 "${rel}"`)

  cache.set(file)

  const filename = getFileName(file)
  for (const [pattern, commands] of actionMap) {
    if (isMatch(filename, pattern)) {
      for (const command of commands) {
        await execute(command, file)
      }
    }
  }

  console.info(`[lint-saved] ✅ "${rel}"`)
}
