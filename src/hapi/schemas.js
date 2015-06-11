/**
 * Links Schemas
 * Created by abecchis on 28/04/15.
 */
'use strict';

var Joi = require('joi');

var schemas = {

  linkCreate: {
    url: Joi.string().required(),
    comment: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional()
  },

  linkUpdate: {
    url: Joi.string().required(),
    timestamp: Joi.date().required(),
    archive: Joi.bool().required(),
    comment: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    type: Joi.string().regex(/link/).required()
  },

  linkPatch: {
    url: Joi.string().optional(),
    timestamp: Joi.date().optional(),
    archive: Joi.bool().optional(),
    comment: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    type: Joi.string().regex(/link/).optional()
  }
};

module.exports = schemas;
