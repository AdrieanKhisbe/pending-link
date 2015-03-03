/**
 * Routes of the api
 *
 * Created by abecchis on 26/02/15.
 */

"use strict";

var LinkController = require('../controller/linkController');
var Joi = require('joi');


module.exports = [
    {
        method: 'GET', path: '/hello', handler: function (req, res) {
        res("Hello Links!")
    }
    },

    // Liens
    {method: 'GET', path: '/api/links', handler: LinkController.all},
    {method: 'PUT', path: '/api/links', handler: LinkController.update},
    {method: 'DELETE', path: '/api/links', handler: LinkController.remove},
    {method: 'GET', path: '/api/links/{id}', handler: LinkController.get},
    {
        method: 'POST', path: '/api/links',
        config: {
            handler: LinkController.create,
            validate: {payload: {url: Joi.string().required()}}
        }
    }

]