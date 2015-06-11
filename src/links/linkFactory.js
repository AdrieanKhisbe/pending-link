/**
 * Factory de dummy links
 *
 * Created by abecchis on 26/02/15.
 */
'use strict';

var Link = require('./link');
var faker = require('faker');
var factory = require('factory-girl');

factory.define('link', Link, {
  type: 'link',
  url: function(){ return faker.internet.domainName(); },
  comment: function(){ return faker.hacker.phrase(); },
  tags: [], //TODO: pick from tag list
  timestamp: function(){ return Date.now(); },
  archived: false
});

module.exports = {
  create: function(callback){
    // TODO: make it unsync
    factory.build('link', function(err, link) {
      callback(link);
    });
  }
};
