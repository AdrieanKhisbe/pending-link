/**
 * Routes of the api
 *
 * Created by abecchis on 26/02/15.
 */

"use strict";

var Joi = require('joi');

module.exports =  [
    // index and doc
    {method: 'GET', path: '/', handler: {file: "public/index.html"}},
    {method: 'GET', path: '/doc', handler: {file: "public/api.html"}},

  ];
