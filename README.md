Pending Link
============

[![Dependency Status](https://david-dm.org/AdrieanKhisbe/pending-link.svg)](https://david-dm.org/AdrieanKhisbe/pending-link) [![devDependency Status](https://david-dm.org/AdrieanKhisbe/pending-link/dev-status.svg)](https://david-dm.org/AdrieanKhisbe/pending-link#info=devDependencies)

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
Modules are dispatched in the model, controller, views folder.

#### Configuration

Configuration WILL BE DONE using nconf.
Here are the main configurtion points:

- TOBEDONE
- ONEDAY

Logging is being done using [Bunyan](https://github.com/trentm/node-bunyan)
So if you run the process, you better pipe it to *bunyan* program.

### Api documentation
Documentation from raml spec can be generated with `raml2html` available on `npm`,
regenerate them using `raml2html api-raml.yaml > public/api.html`

Can be invoked with `npm run generate-doc`

### Client Generation

Raml tool example:
```sh
npm install raml-client-generator -g
raml-to-client api.raml -o api-client -l javascript
```
