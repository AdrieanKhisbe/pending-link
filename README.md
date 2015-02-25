Pending Link
============

Small server POC for a rest api to store link to be read.

Enable to store link, to which you can attach tag so that you miss any link.
<!-- Yes I know i pocket like light :p -->

See Raml api specification [here :) ](api-raml.yaml)


You can consult the api on [Heroku](https://pending-link.herokuapp.com/)


### Client Generation

Raml tool example:
npm install raml-client-generator -g
raml-to-client api.raml -o api-client -l javascript
