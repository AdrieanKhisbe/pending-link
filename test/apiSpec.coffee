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

serv = null


## utils functions
respond_with_json = (method, url) ->
  (done) ->
    api[method](url)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/, done)


#testing_api

describe 'The Api', ->

  beforeEach (done) ->
    serv = server(port)
    serv.start done

  afterEach (done) ->
    serv.stop done

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
