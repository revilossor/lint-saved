const getPackageJson = require('./getPackageJson')

const merge = (left = [], right = []) => [...(new Set([...left, ...right]))]

const assignFromJsonKey = (map, json, key) => {
  Object.entries(json?.[key] ?? []).forEach(([key, value]) => {
    const list = Array.isArray(value) ? value : [value]
    map.set(key, merge(map.get(key), list))
  })
  return map
}

module.exports = async () => {
  const pkg = await getPackageJson()
  const map = new Map()
  assignFromJsonKey(map, pkg, 'lint-staged') // TODO module for preparing commands - should have npx if not npm. How to handle non-node stuff?
  assignFromJsonKey(map, pkg, 'lint-saved')
  return map
}
