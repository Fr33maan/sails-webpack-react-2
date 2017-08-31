import reduxCrudAsync from 'redux-crud-async'
import { hostConfig } from '../../config/hostConfig'
import { models } from '../../config/models'

import formReducers           from './formReducers'
import authReducer            from './authReducer'
import profilePictureReducer  from './profilePictureReducer'


var crud = new reduxCrudAsync(hostConfig)

var reducers = {}

reducers = {
  ...authReducer,
  ...formReducers,
  ...profilePictureReducer,
}

module.exports = reducers
