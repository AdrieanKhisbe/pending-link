/**
 * Links Schemas
 * Created by abecchis on 28/04/15.
 */
'use strict';

var paperwork = require('paperwork');
var schemas = {

  linkCreate: {
    url: String,
    comment: paperwork.optional(String),
    tags: paperwork.optional([String])
  },

  linkUpdate: {
    url: String,
    timestamp: Date,
    archive: Boolean,
    comment: String,
    tags: [String]
  },

  linkPatch: {
    url: paperwork.optional(String),
    timestamp: paperwork.optional(Date),
    archive: paperwork.optional(Boolean),
    comment: paperwork.optional(String),
    tags: paperwork.optional([String])
  }
};

module.exports = schemas;
