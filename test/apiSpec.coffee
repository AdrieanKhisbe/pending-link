server = require('../src/server.js')
request = require('supertest')
should = require('chai').should()

serv = null

# TODO: test util

describe "Api server", ->
  it 'can be created with a port', ->
    serv = server(12345)
    should.exist serv
  it 'can be launched', ->
    serv.start()
  it 'can be shutted down', ->
    serv.stop()

describe 'The Api', ->

  before = ->
    serv = server(12345)
    serv.start()

  it 'respond with json'#, (done) ->
   #request(server)
 #    .get('/api/hello')
       #.set('Accept', 'application/json')
       #.expect('Content-Type', /json/)
   #  .expect(200, done)