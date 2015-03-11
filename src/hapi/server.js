/** The server
 * Created by abecchis on 27/02/15.
 */
"use strict";

var Hapi = require('hapi');
var Blipp = require('blipp');
var routes = require('./routes');

module.exports = function(port, host){
  // Default value
  if(!host ) host = "0.0.0.0";

    //TODO: exteriorise?
    var config = {
        load: {sampleInterval: 5000} // process monitoring
    };
    //TODO: see how config doc
    var server = new Hapi.Server(config);
  server.connection({ port: port, host:host });
  server.route(routes);

  server.loadGoodies = function(){
        // Bliip plugin (print routes)
        server.register({ register: Blipp }, function(err) {
            if(err) console.warn("Error happened loading blipp %j", err);
	    console.log('Server running at: ' + server.info.uri);
        });
    }

  return server;
}
