port = 12543

conf = require('../src/config/configuration.js');
log = require('../src/config/logger')(conf);

server = require('../src/express')
should = require('chai').should()

serv = null
serv_serv = null


describe "Express server", ->
  it 'can be created with a port', ->
    serv = server(port)
    should.exist serv
  it 'can be launched', (done) ->
    serv_serv = serv.start done

  it 'can be shutted down', (done) ->
    serv_serv.close done
