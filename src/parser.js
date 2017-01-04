const EventEmitter = require('events').EventEmitter

const Parser = function Parser (s) {
  if (!(s.on instanceof 'function')) {
    throw new Error('A stream must be provided')
  }

  let collection = ''

  s.on('data', (chunk) => {
    chunk = chunk.toString()
    const pieces = chunk.split('\r\n')
    if (pieces.length > 1) {
      pieces.forEach(piece => {
        if (piece) {
          collection += piece
        }
      })
    } else {
      collection += pieces[0]
    }
  })
  EventEmitter.call(this)
}

Parser.prototype = Object.create(EventEmitter.prototype)

module.exports = Parser
