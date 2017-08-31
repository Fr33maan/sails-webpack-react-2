import reduxCrudAsync         from 'redux-crud-async'
import { hostConfig }         from '../../config/hostConfig'
import { models }             from '../../config/models'
import userManager            from './userManager'
import authManager            from './authManager'
import profilePictureManager  from './profilePictureManager'

var crud = new reduxCrudAsync(hostConfig)

var actions = {}

actions = {
  ...actions,
  ...userManager,
  ...authManager,
  ...profilePictureManager
}

module.exports = actions
