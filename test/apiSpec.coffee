port = 12543

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
    .end callback
  ## maybe retrieve location rather to assume 0

## all the test
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
         it "it respond with json", (done) ->
            respond_with_json 'post', LINK_ENDPOINT, done, {code:201, body:data.valid_link_request}
         # todo: check valid and non valid output

           # todo: check location

      describe "Get endpoint", ->
        it "it respond with json", (done) ->
          respond_with_json 'get', LINK_ENDPOINT, done


      LINK_RES = LINK_ENDPOINT + "/0"

      describe "Get single resource endpoint", ->

        it "it respond with json", (done) ->
          post_basic_link ->
            respond_with_json 'get', LINK_RES, done

        ## TODO check format?

      describe "Put endpoint", ->
        it "it respond with json", (done) ->
          post_basic_link ->
            respond_with_json 'put', LINK_RES, done, {body:data.valid_link_update}

        it "update works", (done) ->
          post_basic_link ->
            api.put(LINK_RES).send(data.valid_link_update).end ->
              api.get(LINK_RES).expect(200)
                .expect (res) -> res.body.should.equal data.valid_link_update
                .end done
                ## FIX (maybe: equal link?)


      describe "Patch endpoint", ->
        it "it respond with json", (done) ->
          post_basic_link ->
            respond_with_json 'patch', LINK_RES, done, {body:data.valid_link_partial_update}

        it "patch works", (done) ->
          post_basic_link ->
            api.patch(LINK_RES).send(data.valid_link_partial_update).end ->
              api.get(LINK_RES).expect(200)
                .expect (res) -> res.tags.shoud.equal data.valid_link_partial_update.tags
                .end done

      describe "Delete endpoint", ->
        it "it respond with json", (done) ->
          post_basic_link ->
            respond_with_json 'delete', LINK_RES, done

        it "delete things", (done) ->
          post_basic_link ->
            api.del(LINK_RES).end ->
              api.get(LINK_RES).expect(404,done)





# Test Both implementation!
testing_api "Express", expressServer
testing_api "Hapi", hapiServer
