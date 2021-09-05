#!/usr/bin/env node

console.log('todo...')

// module for restart handler - needs action map, cache
// - when invoked
//    - checks cache for file
//    - if bad, does nothing
//    - if good
//        - logs start
//        - sets cache
//        - matches every rule pattern against filename
//            - if match, executes all
//            - if not, does nothing
//        - logs end

// main that inits action map, cache, handler and watches - invoked from here
