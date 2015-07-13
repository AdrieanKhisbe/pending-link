/**
 * Static routes
 *
 * Created by abecchis on 26/02/15.
 */
'use strict';

module.exports = [
    // index and doc
    {method: 'GET', path: '/', handler: {file: 'public/index.html'}},
    {method: 'GET', path: '/doc', handler: {file: 'public/api.html'}},
    {method: 'GET', path: '/doc/{param*}', handler: { directory: {path: 'spec', listing: true}}}
  ];
