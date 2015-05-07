BASE_SRC = '../../src'

options = require("#{BASE_SRC}/config/options").nullOption

Link = require "#{BASE_SRC}/links/link"
LinkDaoFactory = require "#{BASE_SRC}/links/linkDao"
LinkFactory = require "#{BASE_SRC}/links/linkFactory"
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
    it 'can store links', (done) ->
      LinkFactory.create (link) ->
        LinkDao.save link, (savedLink) ->
          savedLink.should.not.be.null
          savedLink.url.should.equal link.url
          done()

    it 'that can be retrieved' , (done) ->
      LinkFactory.create (link) ->
        LinkDao.save link, (savedLink) ->
          LinkDao.get savedLink._id, (retrievedLink) ->
            JSON.stringify(savedLink).should.be.eql JSON.stringify(retrievedLink)
            # note: strange, not working without serialisation
            # TODO :make a comparae link function
            done()