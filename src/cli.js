#!/usr/bin/env node

console.log('todo...')

// module for working out extention map
// - adds commands from package.json lint-staged
// - adds commands from package.json lint-saved
// - has helper for getting expentions

// module for caching processed files
// - basically a map, but has is overridden to also chech expiry

// module for starting nodemon
// - only watches map ententions
// - has restart handler
// - when invoked... for each file...
//    - checks cache for file
//    - if bad, does nothing
//    - if good
//        - logs start
//        - sets cache
//        - matches every rule pattern against filename
//            - if match, executes
//            - if not, does nothing
//        - logs end
