#!/usr/bin/env node

console.log('todo...')

// module for starting nodemon
// - watches everything....
// - invokes restart handler for each file

// module for restart handler
// - when invoked
//    - checks cache for file
//    - if bad, does nothing
//    - if good
//        - logs start
//        - sets cache
//        - matches every rule pattern against filename
//            - if match, executes
//            - if not, does nothing
//        - logs end
