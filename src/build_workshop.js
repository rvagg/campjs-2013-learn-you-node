#!/usr/bin/env node

const blorg = require('blorg')
    , fs    = require('fs')

function build () {
  blorg(__dirname, blorg.archetypes.presentation({
      files  : { root: './workshop.md' }
    , output : '../workshop.html'
  }))
}

build()

if (process.argv[2] == '--watch')
  fs.watchFile('./workshop.md', { interval: 500 }, build)