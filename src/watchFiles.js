const nodemon = require('nodemon')

const ext = 'md,json,js,ts,jsx,tsx'

console.info(`[lint-saved] watching in "${process.cwd()}"...`)

module.exports = onFileChange => {
  nodemon({
    exec: ':',
    ext
  }).on('restart', async files => {
    const list = [...files]
    while (list.length > 0) {
      await onFileChange(list.shift())
    }
  })
}
