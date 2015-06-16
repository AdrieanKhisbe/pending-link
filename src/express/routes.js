/**
 * Routes of the api
 *
 * Created by abecchis on 09/03/15.
 */
'use strict';

var express = require('express');

module.exports = function(LinkController) {

  var router = express.Router();

  router.get('/hello', function (req, res) {
    res.send('Hello Links!');
  });

  router.route('/links')
    .get(LinkController.all)
    .post(LinkController.create);

  router.route('/links/:id')
    .get(LinkController.get)
    .put(LinkController.update)
    .patch(LinkController.partialUpdate)
    .delete(LinkController.remove);

  router.get('/tags/:tagName', LinkController.findByTags);
  router.get('/tags', LinkController.allTags);

  return router;
};
