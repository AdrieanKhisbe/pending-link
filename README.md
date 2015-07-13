Pending Link
============

[![Build Status](https://travis-ci.org/AdrieanKhisbe/pending-link.svg?branch=master)](https://travis-ci.org/AdrieanKhisbe/pending-link)
[![Heroku](https://img.shields.io/badge/heroku-online-6567a5.svg)](http://pending-link.herokuapp.com/)
[![Dependency Status](https://david-dm.org/AdrieanKhisbe/pending-link.svg)](https://david-dm.org/AdrieanKhisbe/pending-link)
[![devDependency Status](https://david-dm.org/AdrieanKhisbe/pending-link/dev-status.svg)](https://david-dm.org/AdrieanKhisbe/pending-link#info=devDependencies)

Small server POC for a REST API to store link to be read.
This was made to compare `express` and `hapi` *node.js* frameworks.

Enable to store link, to which you can attach tag so that you miss any link.
<!-- Yes I know it's like a pocket light :p -->

The api is available on [Heroku](https://pending-link.herokuapp.com/)

### Details

*Pending Link* is a REST API about one specific resource, Links

Links consist in an `url`, a `comment`, a set of `tags`, a `timestamp`, and a status `archived`, and an `id`. They are available on the server at the endpoint `/api/links` with the standard `POST`/`GET`, and `GET`,`PUT`,`DELETE` on the subresources

Server also have another endpoint `/api/hello` to ping if the server is online

For more details, See Raml api specification [here :) ](api-raml.yaml)


#### Configuration

Configuration is using [nconf](https://github.com/indexzero/nconf) so you can tweak it from the command line or with environment variable.

The main configuration points are the listening port `pl:port`, the base uri `pl:base_uri` and the path of the `nedb` database `db:path`.

#### List of Options
<!-- TODO: necessary -->

##### Application
*To be specified in details*
##### Data Store
With pending link, you can either use *nedb* as in memory database, or a dedicated collection on a mongo database.
The switch is done with the `db:in_memory` option.

<!-- TODO: prefix, all options, equiv in memoyr -->


##### Logging

*To be specified in details*

#### Example

The best example of a config is the default one: 

```json
{
  "pl": {
    "application_name": "pending-link",
    "listening_address": "0.0.0.0",
    "port": 12121,
    "base_uri": "/api/v1"
  },
  "log": {
    "level": "debug",
    "stream": "process.stdout",
    "path": ""
  },
  "db":{
    "in_memory": true,
    "config": { "path": "./link.nedb" }
  }
}
```


### Api documentation
Documentation from raml spec can be generated with `raml2html` available on `npm`,
regenerate them using `raml2html api-raml.yaml > public/api.html`

Can be invoked with `npm run generate-doc`, or with `npm run build` that will also
update the homepage from the jade template.


### Development Notes

#### Project Structure
As you may expect, tests are in `test`, and code in `src` folder.
Hapi and Express specific files are respectively in the `hapi` and `express` folder.
The `app.js` at the root of the project decide which one to load based on command line argument.

The common object links and it's dao are in the `links` subfolder, and the `config` in the folder with the same name.


### Monitoring

Logging is being done using [Bunyan](https://github.com/trentm/node-bunyan)
So if you run the process, you better pipe it to *bunyan* program.


<!-- quiet for now
### Client Generation
A client can be generated with Raml tool example:
```sh
npm install raml-client-generator -g
raml-to-client api.raml -o api-client -l javascript
```
-->
