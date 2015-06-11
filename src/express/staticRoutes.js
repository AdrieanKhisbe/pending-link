/**
 * Routes of the api
 *
 * Created by abecchis on 09/03/15.
 */
'use strict';

var express = require('express');

module.exports = function() {

  var router = express.Router();

  router.get('/', function (req, res) {
    res.sendFile('index.html', {root: './public'});
  });
  router.get('/doc', function (req, res) {
    res.sendFile('api.html', {root: './public'});
  });

  router.use('/doc', express.static('spec'));

  return router;
};
