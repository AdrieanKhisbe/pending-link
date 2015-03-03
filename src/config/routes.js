/**
 * Routes of the api
 *
 * Created by abecchis on 26/02/15.
 */

"use strict";

var LinkController = require('../controller/linkController')


module.exports = [
    {
        method: 'GET', path: '/hello', handler: function (req, res) {
        res("Hello Links!")
    }
    },
    {method: 'GET', path: '/api/links', handler: LinkController.all},
    {method: 'POST', path: '/api/links', handler: LinkController.create},
    {method: 'PUT', path: '/api/links', handler: LinkController.update},
    {method: 'DELETE', path: '/api/links', handler: LinkController.remove}
    ]