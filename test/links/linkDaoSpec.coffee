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
    LinkDao.all (err, links) ->
      should.not.exist err
      links.length.should.equal 0
      done()

  describe 'Basic storage', ->
    it 'can store links', (done) ->
      LinkFactory.create (link) ->
        LinkDao.save link, (err, savedLink) ->
          should.not.exist err
          savedLink.should.not.be.null
          savedLink.url.should.equal link.url
          done()

    it 'that can be retrieved' , (done) ->
      LinkFactory.create (link) ->
        LinkDao.save link, (err, savedLink) ->
          should.not.exist err
          LinkDao.get savedLink._id, (nerr, retrievedLink) ->
            should.not.exist nerr
            JSON.stringify(savedLink).should.be.eql JSON.stringify(retrievedLink)
            # note: strange, not working without serialisation
            # TODO :make a compare link function
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