Pending Link
============

Small server POC for a rest api to store link to be read.

Enable to store link, to which you can attach tag so that you miss any link.
<!-- Yes I know i pocket like light :p -->

See Raml api specification [here :) ](api-raml.yaml)


You can consult the api on [Heroku](https://pending-link.herokuapp.com/)

### Development Notes

#### Organisation
As you may expect, tests are in `test`, and code in `src` folder.
Modules are dispatched in the model, controller, views folder.

#### Configuration

Configuration WILL BE DONE using nconf.
Here are the main configurtion points:

- TOBEDONE
- ONEDAY

Login is being done using [Bu](https://github.com/trentm/node-bunyan)

### Client Generation

Raml tool example:
npm install raml-client-generator -g
raml-to-client api.raml -o api-client -l javascript
