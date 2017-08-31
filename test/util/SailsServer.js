
var Sails = require('sails').Sails;
import {injectAuthPolicy} from './utils'
import testFixtures from './fixtures'
import {policies} from '../../config/policies'


export default class SailsServer {

  sails = null

  lift(additionalConfig){

    return new Promise((resolve, reject) => {
      // Attempt to lift sails
      Sails().lift(additionalConfig, (err, sails) => {
        if (err || !sails) return reject(err)
        this.sails = sails

        testFixtures(sails)
        .then(resolve)
        .catch(console.log)
      })
    })
  }

  lower(){
    return new Promise(resolve => {
      this.sails.lower(resolve)
    })
  }

  start(config={}, fixtures, authPolicy){
    const self = this
    return done => {

      const newPolicies = authPolicy ? injectAuthPolicy(authPolicy) : policies

      async function lift(){
        try{
          await self.lift({
            ...config,
            policies : newPolicies
          })
          await fixtures()
        }catch(e){
          return e
        }
      }
      lift()
      .then(done)
      .catch(done)
    }
  }

  stop(){
    return done => {
      this.lower()
      .then(done)
      .catch(done)
    }
  }
}
