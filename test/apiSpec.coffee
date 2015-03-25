# TEST OF THE LINK API

options = require('../src/config/options').null_option
port = options.port = 12543

hapiServer = require('../src/hapi')
expressServer = require('../src/express')
supertest = require('supertest');
api = supertest("http://0.0.0.0:#{port}")
should = require('chai').should()
req = require('./utilTest')(api)

data = require('./data')

# Constant
HELLO_ENDPOINT = '/api/hello'
LINK_ENDPOINT = '/api/links'

serv = null



# FIXME: CHECK RETURN CODE!!!!!!!!!!!!! NO CONTENT TYPE

## utils functions
respond_with_json = (method, url, callback, opts) ->
    body = opts?.body
    code = opts?.code

    query = api[method](url)
      .set('Accept', 'application/json')
      .expect(code || 200)
      .expect('Content-Type', /json/)
    if body then query.send body
    query.end(callback)

post_basic_link = (callback) ->
  api['post'](LINK_ENDPOINT).set('Accept', 'application/json')
    .send(data.valid_link_request)
    .end (err, res) ->
      callback res.headers.location
  ## maybe retrieve location rather to assume 0

## all the test
testing_api = (name, server) ->

  describe "The Api in #{name}", ->

    beforeEach (done) ->
      serv = server(options)
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
         #it "it respond with json", (done) ->
          #  respond_with_json 'post', LINK_ENDPOINT, done, {code:201, body:data.valid_link_request}
         # todo: check valid and non valid output
         it "should answer with a location (that I can access)"
           # todo: check location


      describe "Get endpoint", ->
        it "it respond with json", (done) ->
          respond_with_json 'get', LINK_ENDPOINT, done

      describe "Get single resource endpoint", ->

        it "it say 404 when try to get bullshit", (done) ->
          api.get(LINK_ENDPOINT+"/whatevertheweather").expect(404,done)

        it "it respond with json", (done) ->
          post_basic_link (url) ->
            respond_with_json 'get', url, done

      describe "Put endpoint", ->
        it "update works", (done) ->
          post_basic_link (url) ->
            # TODO: clone valid update with value url?
            api.put(url).send(data.valid_link_update).end ->
              api.get(url).expect(200)
                .expect (res) -> res.body.should.equal data.valid_link_update
                .end done
                ## FIX (maybe: equal link?)


      describe "Patch endpoint", ->

        it "patch works", (done) ->
          post_basic_link (url) ->
            api.patch(url).send(data.valid_link_partial_update).end ->
              api.get(url).expect(200)
                .expect (res) -> res.tags.should.equal data.valid_link_partial_update.tags
                .end done

      describe "Delete endpoint", ->

        it "delete things", (done) ->
          post_basic_link (url) ->
            api.del(url).end ->
              api.get(url).expect(410,done)





# Test Both implementation!
testing_api "Express", expressServer
testing_api "Hapi", hapiServer
