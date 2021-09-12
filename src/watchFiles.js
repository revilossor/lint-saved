const nodemon = require('nodemon')

const ext = 'md,json,js,ts,jsx,tsx'
const ignore = [
  '**/build/*',
  '**/.git/*',
  '**/coverage/*',
  '**/node_modules/*',
  '**/__snapshots__/*',
  '**/public/*',
  '**/assets/*'
]

// TODO need to be able to specify ignores and ententions, and have sensible defaults

let running = false

module.exports = onFileChange => {
  nodemon({
    exec: ':',
    ignore,
    ext
  }).on('start', () => {
    if (!running) { // TODO test this
      running = true
      console.log(`[lint-saved] 👀 ${process.cwd()}`)
    }
  }).on('restart', async files => {
    const list = [...files]
    while (list.length > 0) {
      await onFileChange(list.shift())
    }
  })
}
