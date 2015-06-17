/**
 * Routes of the api
 *
 * Created by abecchis on 09/03/15.
 */
'use strict';

var express = require('express');
var paperwork = require('paperwork');
var schemas = require('./schemas');

module.exports = function(LinkController) {

  var router = express.Router();

  router.get('/hello', function (req, res) {
    res.send('Hello Links!');
  });

  router.route('/links')
    .get(LinkController.all)
    .post(paperwork.accept(schemas.linkCreate), LinkController.create);

  router.route('/links/:id')
    .get(LinkController.get)
    .put(paperwork.accept(schemas.linkUpdate), LinkController.update)
    .patch(paperwork.accept(schemas.linkPatch), LinkController.partialUpdate)
    .delete(LinkController.remove);

  router.get('/tags/:tagName', LinkController.findByTags);
  router.get('/tags', LinkController.allTags);

  return router;
};
