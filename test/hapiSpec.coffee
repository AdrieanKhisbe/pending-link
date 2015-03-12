port = 12543

# >
conf = require('../src/config/configuration.js');
log = require('../src/config/logger')(conf);

server = require('../src/hapi')
should = require('chai').should()
serv = null

describe "Hapi server", ->
  it 'can be created with a port', ->
    serv = server(port)
    should.exist serv
  it 'can be launched', (done) ->
     serv.start ->
      serv.info.created.should.be.above 0
      serv.info.started.should.be.above 0
      done()
  it 'can be shutted down', (done)->
    serv.root.stop ->
      serv.info.started.should.equal 0
      serv.info.created.should.above 0
      done()
