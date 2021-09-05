const nodemon = require('nodemon')

module.exports = onFileChange => nodemon({
  exec: ':',
  ext: 'md,json,js,ts,jsx,tsx'
}).on('restart', async files => {
  const list = [...files]
  while (list.length > 0) {
    await onFileChange(list.shift())
  }
})
