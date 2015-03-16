Link = require '../../src/model/link.js'
LinkDao = (require '../../src/model/linkDao.js')()
should = require('chai').should()

describe 'Link Dao', ->
  it 'has initially no link', ->
    links = LinkDao.all()
    links.length.should.equal 0

  it 'can store links', ->
    link = Link.create 'abc'
    LinkDao.save link

  it 'that can be retrieved', ->
    links = LinkDao.all()
    links[0].url.should.equal 'abc'

