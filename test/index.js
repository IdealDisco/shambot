const expect = require('chai').expect
const Shambot = require('../src/')
const net = require('net')
const tls = require('tls')
const EventEmitter = require('events').EventEmitter

describe('Shambot', function () {
  it('should be a constructor', function () {
    const bot = new Shambot()
    expect(bot).to.be.an.instanceof(Shambot)
    expect(EventEmitter.prototype.isPrototypeOf(bot)).to.be.true
  })
  it('should connect to an IRC server', function (done) {
    const bot = new Shambot({ host: '127.0.0.1', port: 4000 })
    let count = 0
    const server = net.createServer(() => {
      count++
    })
    server.listen(4000, () => {
      bot.connect(() => {
        expect(count).to.equal(1)
        done()
      })
    })
  })
  xit('should connect to a secure server over tls', function () {
    // TODO
  })

  describe('Events', function () {
    const server = net.createServer()
    const bot = new Shambot({ port: 4040, host: '127.0.0.1' })
    before(function (done) {
      server.listen(4040, () => bot.connect(() => done()))
    })
    it('should provide a `message` event', function (done) {
      const messageExpect = message => {
        expect(message).to.be.a('string')
        done()
      }
      bot.on('message', messageExpect)
    })
  })
})
