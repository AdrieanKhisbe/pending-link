/** The Express server
 * Created by abecchis on 09/03/15.
 */
"use strict";

var express = require('express');
var server = express();

module.exports = function(port, host){
  // Default value
  if(!host ) host = "0.0.0.0";

  server.get('/', function(req, res){
	res.send('hello world');
    });

  server.start = function(){
      server.listen(port);
  }

  server.loadGoodies = function(){
    // No goodies
  }

  return server;
}
