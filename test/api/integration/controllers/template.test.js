
// External modules
import { Sails }    from 'sails'
import { assert, expect, should }   from 'chai'
import request      from 'supertest'

// Utils and config
import SailsServer  from '../../../util/SailsServer'

let s = new SailsServer()

describe('Integration :: ', function(){

  let user, user2, channel, channel2, reqUser

  async function fixtures(){
    const m = s.sails.models
    user           = await m.user.findOne({username : 'jeronimo'})
    user2          = await m.user.findOne({username : 'lilili'})

    return null
  }

  function authenticate(req,res,next){
    req.user = reqUser || user
    next()
  }

  before(s.start(null, fixtures, authenticate))
  after(s.stop())

  it("should be a test", function(done){
    reqUser = user2

    request(s.sails.hooks.http.app)
    .get(`/`)
    .expect(200)
    .end(done)
  })

})
