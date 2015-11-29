/** The Hapi server
 * Created by abecchis on 27/02/15.
 */
'use strict';

var Hapi = require('hapi');
var Good = require('good');
var Blipp = require('blipp');
var clone = require('clone');

var defaultOption = require('../config/options').defaultOption;
var controller = require('./linkController');
var routes = require('./routes');
var staticRoutes = require('./staticRoutes');

/**
 * Hapi Server Builder
 * @param options - Options to the builder
 * @returns {*} - Hapi server waiting to be started
 */
module.exports = function makeHapiServer(options) {

    if (!options) options = defaultOption;

    var log = options.logger;

    var hapiConfig = {
        load: {sampleInterval: 5000} // process monitoring
    };

    var server = new Hapi.Server(hapiConfig);
    server.connection({port: options.port, host: options.host});

    /** Define local routes plugin */
    function routesPlugin(server, pluginOptions, next) {
        server.route(routes(controller(options)));
        next();
    }
    routesPlugin.attributes = {name: 'link-routes', version: '0.0.1'};

    /** Load routes */
    server.register({register: routesPlugin}, {routes: {prefix: options.baseUri}},
        function (err) {
            console.error("Problem occured while registering routes")
        });

    /** Load plugins (routes printing + logging) */
    server.loadGoodies = function () {
        server.register([Blipp, {
            register: Good,
            options: {
                reporters: [{
                    reporter: require('good-console'),
                    events: {request: '*', response: '*'}
                }]
            }
        }], function (err) {
            if (err) log.error('Error happened loading Plugins:\n %j', err);

            log.info('Server running at: ' + server.info.uri);
        });
    };

    return server;
};
