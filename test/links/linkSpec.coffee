Link = require '../../src/links/link'
should = require('chai').should()


describe 'Link Object', ->
  it 'has a working constructor', ->

    link = Link.create 'abc'
    link.url.should.equal 'abc'
    link.archived.should.not.be.true
    should.not.exist link.comment
    link.tags.length.should.be.equal 0

  it 'can contains added tag', ->
    link = Link.create 'dce'
    link.addTag "toto"
    link.tags.should.contains "toto"

  it 'can be deleted tag', ->
    link = Link.create 'fgh'
    link.addTag "toto"
    link.addTag "titi"

    link.removeTag "toto"
    link.tags.should.contains "titi"
    link.tags.should.not.contains "toto"