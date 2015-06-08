Pending Link
============

[![Build Status](https://travis-ci.org/AdrieanKhisbe/pending-link.svg?branch=master)](https://travis-ci.org/AdrieanKhisbe/pending-link)
[![Heroku](https://img.shields.io/badge/heroku-online-6567a5.svg)](http://pending-link.herokuapp.com/)
[![Dependency Status](https://david-dm.org/AdrieanKhisbe/pending-link.svg)](https://david-dm.org/AdrieanKhisbe/pending-link)
[![devDependency Status](https://david-dm.org/AdrieanKhisbe/pending-link/dev-status.svg)](https://david-dm.org/AdrieanKhisbe/pending-link#info=devDependencies)

Small Rest Api server POC for a rest api to store link to be read.
This was made to compare `express` and `hapi` *node.js* frameworks.

Enable to store link, to which you can attach tag so that you miss any link.
<!-- Yes I know i pocket like light :p -->

The api is available on [Heroku](https://pending-link.herokuapp.com/)

### Details

Pending link is a rest api about one specific ressource. Links

Links consist in an `url`, a `comment`, a set of `tags`, a `timestamp`, and a status `archived`, and an `id`. They are available on the server at the endpoint `/api/links` with the standard `POST`/`GET`, and `GET`,`PUT`,`DELETE` on the subresources

Server also have another endpoint `/api/hello` to ping if the server is online

For more details, See Raml api specification [here :) ](api-raml.yaml)

### Development Notes

#### Organisation
As you may expect, tests are in `test`, and code in `src` folder.
Hapi and Express specific files are respectively in the `hapi` and `express` folder.
The `app.js` at the root of the project decide which one to load based on command line argument.

The common object links and it's dao are in the `links` subfolder, and the `config` in the folder with the same name.

#### Configuration

Configuration is using nconf so you can tweak it from the command line.

The main configuration points are the listening port `pl:port`, the base uri `pl:base_uri` and
the path of the `nedb` database `db:path`.

All of them can be seen from the default configuration:
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
    "path": "./link.nedb",
    "in_memory": true
  }
}
```

Logging is being done using [Bunyan](https://github.com/trentm/node-bunyan)
So if you run the process, you better pipe it to *bunyan* program.

### Api documentation
Documentation from raml spec can be generated with `raml2html` available on `npm`,
regenerate them using `raml2html api-raml.yaml > public/api.html`

Can be invoked with `npm run generate-doc`, or with `npm run build` that will also
update the homepage from the jade template.

### Client Generation
A client can be generated with Raml tool example:
```sh
npm install raml-client-generator -g
raml-to-client api.raml -o api-client -l javascript
```
