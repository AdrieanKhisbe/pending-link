port = 12543

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
  it 'can be launched',  ->
    serv.start ->
      serv.info.created.should.be.above 0
      serv.info.started.should.be.above 0
  it 'can be shutted down',->
    serv.root.stop ->
      serv.info.started.should.equal 0
      serv.info.created.should.above 0

describe 'The Api', ->

  before (done) ->
    serv = server(port)
    serv.start done

  it 'Api server is on', ->
    should.exist serv
    serv.info.started.should.be.above 0

  describe 'Hello endpoint', ->
    it 'works', (done) ->
      api.get('/api/hello')
      # api(serv).get('/api/hello')
      .expect(200)
      .expect("Hello Links!", done)


    it 'respond with text', (done) ->
      api.get('/api/hello')
      .expect('Content-Type', /text/)
      .expect(200, done)


  describe "Real link api", ->

    describe "Get endpoint", ->

      it "respond with json", (done)->
        api.get('/api/hello')
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/, done)

        # TODO; arraty

    describe "Post endpoint", ->
      it "Should be done"

      ## todo: check valid and non valid output

      # todo: check localisation


    describe "Get single resource endpoint", ->
      it "Should be done"

    describe "Put endpoint", ->
      it "Should be done"

    describe "Delete endpoint", ->
      it "Should be done"
