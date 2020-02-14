'use strict'
const npa = require('npm-package-arg')
const moduleName = require('../utils/module-name.js')

module.exports = function (child, reqBy) {
  if (!child.requiredBy.length) return
  if (!reqBy) reqBy = child.requiredBy[0]
  const deps = reqBy.package.dependencies || {}
  const devDeps = reqBy.package.devDependencies || {}
  const optDeps = reqBy.package.optionalDependencies || {}
  const name = moduleName(child)
  const spec = deps[name] || devDeps[name] || optDeps[name]
  return npa.resolve(name, spec, reqBy.realpath)
}
