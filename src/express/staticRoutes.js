/**
 * Routes of the api
 *
 * Created by abecchis on 09/03/15.
 */

"use strict";

module.exports = function() {

  var router = require('express').Router();

  router.get('/', function (req, res) {
    res.sendfile("index.html", {root: './public'})
  });
  router.get('/doc', function (req, res) {
    res.sendfile("api.html", {root: './public'})
  });
  return router;
};