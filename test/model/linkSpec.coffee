Link = require '../../src/model/link.js'
should = require('chai').should()


describe 'Link Object', ->
  it 'has a working constructor', ->

    link = new Link 'abc'
    link.url.should.equal 'abc'
    link.archived.should.not.be.true
    should.not.exist link.comment
    link.tags.length.should.be.equal 0

  it 'can contains added tag', ->
    link = new Link 'dce'
    link.addTag "toto"
    link.tags.should.contains "toto"

  it 'can be deleted tag', ->
    link = new Link 'fgh'
    link.addTag "toto"
    link.addTag "titi"

    link.removeTag "toto"
    link.tags.should.contains "titi"
    link.tags.should.nott.contains "toto"