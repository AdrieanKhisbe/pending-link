/**
 * Routes of the api
 *
 * Created by abecchis on 26/02/15.
 */

"use strict";

var LinkController = require('./linkController');
var Joi = require('joi');


module.exports = [

    // index and doc
    {method: 'GET', path: '/', handler: {file: "public/index.html"}},
    {method: 'GET', path: '/doc', handler: {file: "public/api.html"}},


    // Hello endpoint
    {
        method: 'GET', path: '/api/hello', handler: function (req, res) {
        res("Hello Links!")
    }
    },

    // Liens
    {method: 'GET', path: '/api/links', handler: LinkController.all},
    {method: 'PUT', path: '/api/links/{id}',
            config: {
    handler: LinkController.update,
        validate: {payload: {url: Joi.string().required(),
                    timestamp: Joi.date().required(),
                    archive: Joi.bool().required(),
                    comment: Joi.string().required(),
                    tags: Joi.array().items(Joi.string()).required(),
                    type:Joi.string().regex(/link/).required()
        }}
} },
    {method: 'PATCH', path: '/api/links/{id}',
        config: {
        handler: LinkController.partial_update,
            validate: {payload: {url: Joi.string().optional(),
                timestamp: Joi.date().optional(),
                archive: Joi.bool().optional(),
                comment: Joi.string().optional(),
                tags: Joi.array().items(Joi.string()).optional(),
                type:Joi.string().regex(/link/).optional()
            }}
        } },
    {method: 'DELETE', path: '/api/links/{id}', handler: LinkController.remove},
    {method: 'GET', path: '/api/links/{id}', handler: LinkController.get},
    {
        method: 'POST', path: '/api/links',
        config: {
            handler: LinkController.create,
            validate: {payload: {url: Joi.string().required()}}
        }
    }

]
