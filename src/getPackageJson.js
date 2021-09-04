const { resolve } = require('path')
const { access, F_OK } = require('fs')

const getPackageJson = path => new Promise((resolve, reject) => {
  access(path, F_OK, error => {
    if (error) {
      reject(new Error(`Error looking for a package.json in "/mock/path": ${error.message}`))
    }
    resolve(require(path))
  })
})

module.exports = async () => {
  const cwd = process.cwd()
  const path = resolve(`${cwd}/package.json`)
  return await getPackageJson(path)
}
