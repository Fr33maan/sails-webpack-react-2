import reduxCrudAsync from 'redux-crud-async'
import { hostConfig } from '../../config/hostConfig'
import { models } from '../../config/models'

var crud = new reduxCrudAsync(hostConfig)

var actionsTypes = {}

models.forEach(model => {

  actionsTypes = {
    ...actionsTypes,
    crud.primaryActionTypesFor(model)
  }

})

module.exports = actionsTypes
