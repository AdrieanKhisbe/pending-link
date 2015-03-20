/**
 * Routes of the api
 *
 * Created by abecchis on 09/03/15.
 */

"use strict";

module.exports = function(LinkController) {

  var router = require('express').Router();


  router.get('/', function (req, res) {
    res.sendfile("index.html", {root: './public'})
  });
  router.get('/doc', function (req, res) {
    res.sendfile("api.html", {root: './public'})
  });
  // FIXME: extract from route?


  router.get('/api/hello', function (req, res) {
    res.send("Hello Links!");
  });
  router.get('/api/links', LinkController.all);
  router.put('/api/links/:id', LinkController.update);
  router.patch('/api/links/:id', LinkController.partial_update);
  router.delete('/api/links/:id', LinkController.remove);

  router.get('/api/links/:id', LinkController.get);
  router.post('/api/links', LinkController.create);


  return router;
}