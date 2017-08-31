import _ from 'lodash'
import {policies} from '../../config/policies'

export function injectAuthPolicy(authPolicy){
  const newPolicies = {}

  _.forEach(policies, (cPolicies, controller) => {

    if(cPolicies === true || cPolicies === false){
      newPolicies[controller] = cPolicies
      return
    }

    const controllerPolicies = {}
    _.forEach(cPolicies, (policiesArray, action) => {


      if(typeof policiesArray === 'string'){
        if(policiesArray === 'authenticate' || policiesArray === 'isAuthenticated'){
          controllerPolicies[action] = [authPolicy]

        }else{
          controllerPolicies[action] = policiesArray
        }

      }else if(policiesArray instanceof Array){
        controllerPolicies[action] = policiesArray.map(policyName => {
          if(policyName === 'authenticate' || policyName === 'isAuthenticated'){
            return authPolicy

          }else{
            return policyName
          }
        })

      }else{
        controllerPolicies[action] = policiesArray
      }
    })

    newPolicies[controller] = controllerPolicies
  })

  return newPolicies
}
