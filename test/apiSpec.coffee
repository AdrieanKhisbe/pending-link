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

serv = null


## utils functions
respond_with_json = (method, url, code, body) ->
  (done) ->
    api[method](url)
    .set('Accept', 'application/json')
    .expect(code || 200)
    .expect('Content-Type', /json/)
    .end(done)


testing_api = (name, server) ->

  describe "The Api in #{name}", ->

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

        it "respond with json", respond_with_json('get', '/api/links')


      describe "Post endpoint", ->
        it "Should be done"

        it "respond with json", respond_with_json('post', '/api/links')
           ## FIXME: body
        ## todo: check valid and non valid output

        # todo: check localisation


      describe "Get single resource endpoint", ->
        it "Should be done"

      describe "Put endpoint", ->
        it "Should be done"

      describe "Delete endpoint", ->
        it "Should be done"


testing_api "Express", expressServer
testing_api "Hapi", hapiServer
