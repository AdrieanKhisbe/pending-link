/**
 * Routes of the api
 *
 * Created by abecchis on 26/02/15.
 */
'use strict';

var schemas = require('./schemas');

module.exports = function (LinkController) {
  return [

    // Hello endpoint
    {
      method: 'GET', path: '/hello', handler: function (request, reply) {
      reply("Hello Links!");
    }
    },

    // Liens
    {method: 'GET', path: '/links', handler: LinkController.all},
    {
      method: 'PUT', path: '/links/{id}',
      config: {
        handler: LinkController.update,
        validate: { payload: schemas.linkUpdate }
      }
    },
    {
      method: 'PATCH', path: '/links/{id}',
      config: {
        handler: LinkController.partialUpdate,
        validate: { payload: schemas.linkPatch }
      }
    },
    {method: 'DELETE', path: '/links/{id}', handler: LinkController.remove},
    {method: 'GET', path: '/links/{id}', handler: LinkController.get},
    {
      method: 'POST', path: '/links',
      config: {
        handler: LinkController.create,
        validate: {payload: schemas.linkCreate}
      }
    },

    // Tags
    {method: 'GET', path: '/tags/{tagName}', handler: LinkController.findByTags},
    {method: 'GET', path: '/tags', handler: LinkController.allTags}

  ];
};
