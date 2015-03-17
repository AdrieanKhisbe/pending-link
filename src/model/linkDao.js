/**
 * Created by abecchis on 26/02/15.
 */
// V1 in memory

"use strict";
var default_option = require('../config/options').default_option;

module.exports = function (options) {

  if (options == null) options = default_option;

  var log = options.logger;

  return {

    allLinks: [],

    save: function (link) {
      //TODO: check link?
      var id = this.allLinks.length;
      link.id = id;
      this.allLinks[id] = link;
      log.debug("Saved new link %j", link);
      return link;
    },

    "get": function (linkId) {
      return this.allLinks[linkId]
    },

    update: function (link) {
      if (!link || link.id) return false;
      log.debug("update link %d", link.id);
      this.allLinks[link.id] = link;
    },

    // see: id or?
    remove: function (linkId) {
      if (linkId < 0 && linkId > this.allLinks.length - 1) return false;
      log.debug("remove link %d", linkId);
      this.allLinks[linkId].archived = true
    },

    all: function () {
      return [].concat(this.allLinks.filter(function (link) {
        return !link.archived
      }));
    }

    //TODO: finder

  }
};
