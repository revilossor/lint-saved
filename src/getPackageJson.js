const { resolve } = require('path')
const { access, F_OK } = require('fs')

const getPackageJson = path => new Promise((resolve, reject) => {
  const packagePath = `${path}/package.json`
  access(packagePath, F_OK, error => {
    if (error) {
      reject(new Error(`Error looking for a package.json in "${path}": ${error.message}`))
    }
    resolve(require(packagePath))
  })
})

module.exports = async () => {
  return await getPackageJson(
    resolve(process.cwd())
  )
}
