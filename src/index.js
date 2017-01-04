const net = require('net')
const tls = require('tls')
const EventEmitter = require('events').EventEmitter
const Parser = require('./parser')

const Shambot = module.export = function Shambot (opts) {
  opts = opts || {}
  const secure = !!opts.secure // Default to false

  const port = opts.port || (secure && 443) || 6667 // 6667 for TCP, 443 for SSL
  const host = opts.host || 'irc.chat.twitch.tv'
  const conn = new (secure ? tls.TLSSocket : net.Socket)()
  this.connected = false
  const parser = this._parser = new Parser(conn)

  conn.on('connect', () => {
    this.connected = true
  })

  parser.on('data', (data) => {
    console.log(data)
  })

  this.connect = function connect (cb) {
    conn.connect({
      port,
      host
    }, cb)
  }
  EventEmitter.call(this)
}

Shambot.prototype = Object.create(EventEmitter.prototype)

module.exports = Shambot
