BASE_SRC = '../../src'

options = require("#{BASE_SRC}/config/options").nullOption

Link = require "#{BASE_SRC}/links/link.js"
LinkDaoFactory = (require "#{BASE_SRC}/links/linkDao.js")
LinkDao = null

should = require('chai').should()

describe 'Link Dao', ->

  beforeEach (done) ->
    LinkDao = LinkDaoFactory(options)
    done()

  it 'has initially no link', (done) ->
    LinkDao.all (links) ->
      links.length.should.equal 0
      done()

  describe 'Basic storage', ->
    it 'can store links' #, ->
      # link = Link.create 'abc'
      # LinkDao.save link

    it 'that can be retrieved' #, ->
      #links = LinkDao.all()
      #links[0].url.should.equal 'abc'

