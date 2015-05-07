options = (require '../../src/config/options').nullOption

Link = require '../../src/links/link'
LinkDaoFactory = require '../../src/links/linkDao'
LinkFactory = require '../../src/links/linkFactory'
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

    it 'enable link to be modified'


    it 'enable to "delete"(archive) existing ling'

    # Todo: maybe: test for when things go wrong.



  describe 'Improved Queries', ->
    beforeEach (done) ->
      LinkDao = LinkDaoFactory(options)
      # TODO: specific population!! -> Dao set test?
      done()


    it 'return the list of all existing tags'


    it 'return the list of link with specific tags'


    it 'enable us to look for specific content'