/**
 * Routes of the api
 *
 * Created by abecchis on 26/02/15.
 */

"use strict";

var Joi = require('joi');

module.exports = function (LinkController) {
  return [

    // Hello endpoint
    {
      method: 'GET', path: '/hello', handler: function (req, res) {
      res("Hello Links!")
    }
    },

    // Liens
    {method: 'GET', path: '/links', handler: LinkController.all},
    {
      method: 'PUT', path: '/links/{id}',
      config: {
        handler: LinkController.update,
        validate: {
          payload: {
            url: Joi.string().required(),
            timestamp: Joi.date().required(),
            archive: Joi.bool().required(),
            comment: Joi.string().required(),
            tags: Joi.array().items(Joi.string()).required(),
            type: Joi.string().regex(/link/).required()
          }
        }
      }
    },
    {
      method: 'PATCH', path: '/links/{id}',
      config: {
        handler: LinkController.partial_update,
        validate: {
          payload: {
            url: Joi.string().optional(),
            timestamp: Joi.date().optional(),
            archive: Joi.bool().optional(),
            comment: Joi.string().optional(),
            tags: Joi.array().items(Joi.string()).optional(),
            type: Joi.string().regex(/link/).optional()
          }
        }
      }
    },
    {method: 'DELETE', path: '/links/{id}', handler: LinkController.remove},
    {method: 'GET', path: '/links/{id}', handler: LinkController.get},
    {
      method: 'POST', path: '/links',
      config: {
        handler: LinkController.create,
        validate: {payload: {url: Joi.string().required()}}
      }
    }

  ];
};
