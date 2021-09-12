const { spawn } = require('child_process')

module.exports = async (command, file) => {
  return new Promise((resolve, reject) => {
    const parts = command.split(' ')
    if (parts[0] !== 'npm') { // TODO test this.... dont do in here...
      parts.unshift('npx')
    }
    const process = spawn(parts.shift(), [...parts, file])
      .on('close', (...args) => {
        resolve(...args)
      })
      .on('error', err => {
        reject(err)
      })
    process.stdout.on('data', data => { console.log(`[lint-saved] ${data.toString()}`) })
    process.stderr.on('data', data => { console.error(`[lint-saved] ❌ ${data.toString()}`) })
  })
}
