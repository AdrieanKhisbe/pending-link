port = 12543

# >
conf = require('../src/config/configuration.js');
log = require('../src/config/logger')(conf);

# TODO: change?

hapiServer = require('../src/hapi')
expressServer = require('../src/express')
supertest = require('supertest')
api = supertest("http://0.0.0.0:#{port}");
should = require('chai').should()
req = require('./utilTest')(api)

data = require('./data')

# Constant
HELLO_ENDPOINT = '/api/hello'
LINK_ENDPOINT = '/api/links'

serv = null


## utils functions
respond_with_json = (method, url, code, body) ->
  it "respond with json", (done) ->
    query = api[method](url)
      .set('Accept', 'application/json')
      .expect(code || 200)
      .expect('Content-Type', /json/)
    if body then query.send body

    query.end(done)


testing_api = (name, server) ->

  describe "The Api in #{name}", ->

    beforeEach (done) ->
      serv = server(port)
      serv.start done

    afterEach (done) ->
      serv.stop done

    describe 'Hello endpoint', ->
      it 'works', (done) ->
        api.get(HELLO_ENDPOINT)
        .expect(200)
        .expect("Hello Links!", done)


      it 'respond with text', (done) ->
        api.get(HELLO_ENDPOINT)
        .expect('Content-Type', /text/)
        .expect(200, done)


    ############################
    describe "Real link api", ->


      describe "Post endpoint", ->
        it "Should be done"

        respond_with_json('post', LINK_ENDPOINT, 200, data.valid_link_request)
           ## FIXME: body
           ## todo: check valid and non valid output

           # todo: check localisation

      describe "Get endpoint", ->

        respond_with_json('get', LINK_ENDPOINT)


      describe "Get single resource endpoint", ->
        it "Should be done"

      describe "Put endpoint", ->
        it "Should be done"

      describe "Delete endpoint", ->
        it "Should be done"


# Test Both implementation!
testing_api "Express", expressServer
testing_api "Hapi", hapiServer
