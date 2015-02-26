Link = require '../../src/model/link'
require('chai').should()


describe 'Link Object', ->
  it 'has a working constructor', ->

    link = new Link 'abc'
    link.url.should.equal 'abc'
    link.archived.should.not.be true
    link.comment.should.be null
    link.tags.size.should.be 0

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