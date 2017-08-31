
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { push } from 'react-router-redux'

function storageToObject(){
  const token = localStorage.getItem('JWT')
  return token ? {token} : null
}


export const UserIsNotAuth = UserAuthWrapper({
  authSelector      : storageToObject,
  predicate         : token  => !token,
  redirectAction    : () => push('/sign_in'),
  wrapperDisplayName: 'UserIsNotAuth',
})




export const UserIsAuthenticated = UserAuthWrapper({
  authSelector:   storageToObject,
  redirectAction: () => push('/sign_up'),
  wrapperDisplayName: 'UserIsAuthenticated',
})

export const UserComponentWrapper = UserAuthWrapper({
  authSelector: storageToObject,
  wrapperDisplayName: 'UserIsAuthenticated',
  FailureComponent: null

})
