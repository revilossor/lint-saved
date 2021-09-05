const { spawn } = require('child_process')
// TODO test!
module.exports = async (command, file) => {
  return new Promise((resolve, reject) => {
    const parts = command.split(' ')
    const process = spawn(parts.shift(), [...parts, file])
      .on('close', resolve)
      .on('error', reject)
    process.stdout.on('data', data => { console.log(data.toString()) })
    process.stderr.on('data', data => { console.error(data.toString()) })
  })
}
