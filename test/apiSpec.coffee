port = 12543

# >
conf = require('../src/config/configuration.js');
log = require('../src/config/logger')(conf);

# TODO: schange?

server = require('../src/express') # TODO: make it run both with hapi then express
supertest = require('supertest')
api = supertest("http://0.0.0.0:#{port}");
should = require('chai').should()
req = require('./utilTest')(api)

serv = null; serv_serv = null


## utils functions
respond_with_json = (method, url) ->
  (done) ->
    api[method](url)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/, done)




describe "Api server", ->
  it 'can be created with a port', ->
    serv = server(port)
    should.exist serv
  it 'can be launched',  ->
    serv_serv = serv.start ->
      serv.info.created.should.be.above 0
      serv.info.started.should.be.above 0
  it 'can be shutted down',->
    if serv.root
    then serv.root.stop ->
      serv.info.started.should.equal 0
      serv.info.created.should.above 0
    else # it is express
      serv_serv.close -> true # hack

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

      it "respond with json", respond_with_json('get', '/api/hello')


    describe "Post endpoint", ->
      it "Should be done"

      it "respond with json", respond_with_json('post', '/api/hello')

      ## todo: check valid and non valid output

      # todo: check localisation


    describe "Get single resource endpoint", ->
      it "Should be done"

    describe "Put endpoint", ->
      it "Should be done"

    describe "Delete endpoint", ->
      it "Should be done"
