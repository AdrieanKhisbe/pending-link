port = 12345

server = require('../src/server.js')
supertest = require('supertest')
api = supertest("http://0.0.0.0:#{port}");
should = require('chai').should()
req = require('./utilTest')(api)

serv = null

describe "Api server", ->
  it 'can be created with a port', ->
    serv = server(port)
    should.exist serv
  it 'can be launched', ->
    serv.start()
    serv.info.started.should.be.above 0
  it 'can be shutted down', ->
    serv.stop()
    serv.info.started.should.equal 0

describe 'The Api', ->

  before = ->
    serv = server(port)
    serv.start()

  it 'Api server is on', ->
    should.exist serv
    serv.info.started.above 0

  describe 'Hello endpoint', ->
    it 'works', (done) ->
      api.get('/api/hellosss')
      # api(serv).get('/api/hello')
      .expect(200)
      .expect("Hello Links!")
      # here
      done()


  it 'respond with json'#, (done) ->
   #request(server)
 #    .get('/api/hello')
       #.set('Accept', 'application/json')
       #.expect('Content-Type', /json/)
   #  .expect(200, done)