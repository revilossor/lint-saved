#!/usr/bin/env node

const getOptions = require('./getOptions')

const options = getOptions()

console.dir({ options })

// work out where package.json is - cwd i guess... this will be global only?
// work out the extention mapping map
// work out the extentions to watch for based on extention map
// start nodemon
// do the exec line in monmap
