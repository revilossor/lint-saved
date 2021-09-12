const getFileName = file => file.split('/').pop()
const { isMatch } = require('micromatch')
const execute = require('./execute')
const { relative } = require('path')

module.exports = (map, cache) => async file => {
  if (cache.has(file)) { return }

  cache.set(file)

  const filename = getFileName(file)
  for (const [pattern, commands] of map) {
    if (isMatch(filename, pattern)) {
      for (const command of commands) {
        console.info(`[lint-saved] 🏃 ${command} ${file}`)
        await execute(command, file)
      }
    }
  }
  const rel = relative(process.cwd(), file)
  console.info(`[lint-saved] 🏁 ${rel}`) // TODO test this
}
