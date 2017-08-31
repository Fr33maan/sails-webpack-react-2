
// External modules
import { Sails }    from 'sails'
import { assert, expect, should }   from 'chai'
import request      from 'supertest'

// Utils and config
import SailsServer  from '../../../util/SailsServer'

let s = new SailsServer()

let random = () => Math.random().toString(36).replace(/[^a-z]+/g, '')

describe('Integration :: auth', function(){

  let token
  let username = random()
  let email    = random() + '@email.com'
  let password = random()

  before(function (done) {
    s.lift({
      policies : {
        AuthController : {
          sign_up : ['authenticate']
        }
      }
    })
    .then(done)
    .catch(done)
  })

  after(function (done) {
    s.lower()
    .then(done)
    .catch(done)
  })

  it('should be able to sign_up when not signed in', function(done){

    request(s.sails.hooks.http.app)
    .post(`/auth/sign_up`)
    .send({
      username,
      email,
      password
    })
    .expect(201)
    .end((err, res) => {
      expect(res.body).to.have.ownProperty('token')
      expect(res.body).to.have.ownProperty('user')
      expect(res.body.user.email).to.equal(email)
      done(err)
    })
  })

  it("should be able to sign_in when not signed in", function(done){
    request(s.sails.hooks.http.app)
    .post(`/auth/sign_in`)
    .send({
      email : 'li@li.li',
      password: '123123'
    })
    .expect(200)
    .end((err, res) => {
      expect(res.body).to.have.ownProperty('token')
      expect(res.body).to.have.ownProperty('user')
      expect(res.body.user.email).to.equal('li@li.li')
      token = `Bearer ${res.body.token}`
      done(err)
    })
  })

  it("should be NOT be able to sign_up when signed in with a JWT token", function(done){
    request(s.sails.hooks.http.app)
    .post(`/auth/sign_up`)
    .set('authorization', token)
    .send({
      username,
      email,
      password
    })
    .expect(403)
    .end(done)
  })

  it("should be NOT be able to sign_in when signed in with a JWT token", function(done){
    request(s.sails.hooks.http.app)
    .post(`/auth/sign_in`)
    .set('authorization', token)
    .send({
      email : 'any@thing.com',
      password: 'nonono'
    })
    .expect(403)
    .end(done)
  })

})
