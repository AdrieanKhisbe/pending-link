/**
 * Routes of the api
 *
 * Created by abecchis on 09/03/15.
 */
"use strict";

var express = require('express');

module.exports = function(LinkController) {

  var router = express.Router();

  router.get('/hello', function (req, res) {
    res.send("Hello Links!");
  });
  router.get('/links', LinkController.all);
  router.put('/links/:id', LinkController.update);
  router.patch('/links/:id', LinkController.partial_update);
  router.delete('/links/:id', LinkController.remove);

  router.get('/links/:id', LinkController.get);
  router.post('/links', LinkController.create);

  return router;
};