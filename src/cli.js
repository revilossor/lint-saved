#!/usr/bin/env node

const start = require('./main')
const exitHandler = code => {
  process.exit(0)
}

start()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

process.on('exit', exitHandler)
process.on('SIGINT', exitHandler)
