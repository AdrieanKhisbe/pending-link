server = require('../src/server.js');
request = require('supertest');

# TODO: test util

describe 'GET /hello', ->
 it 'respond with json', done ->
   request(server)
     .get('/api/hello')
     #.set('Accept', 'application/json')
     #.expect('Content-Type', /json/)
     .expect(200, done)