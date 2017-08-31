
import { hostConfig } from '../../config/hostConfig'
import { actions } from 'react-redux-form';
import { push } from 'react-router-redux'

const XHR = require('redux-crud-async/lib/utils/xhr/xhr').XHR


function checkSessionStatus(){

  return dispatch => {

    async function refreshToken(){

      // If we cannot find a token we return
      const oldToken = localStorage.getItem('JWT')
      if(!oldToken) return 'no token found in localStorage'

      const res = await new XHR(hostConfig, null, `/auth/refresh_token/${oldToken}`).get()

      localStorage.setItem('JWT', res.token)
      dispatch({
        type : 'USER_BACK',
        user : res.user
      })

      return 'token refreshed'
    }

    return refreshToken()
  }
}

function signUp(account, dispatch){

  // We don't need to send this to the server to create the account
  const {username, email, password, recaptchaKey} = account

  return new Promise((resolve, reject) => {
    return new XHR(hostConfig, null, `${hostConfig.host}/auth/sign_up`)
    .post({
      username,
      email,
      password,
      recaptchaKey
    })
    .then(res => {
      localStorage.setItem('JWT', res.token)
      dispatch({
        type : 'USER_SIGN_UP',
        user : res.user
      })

      // Redirect after successfull login
      // TODO -> better see authWrapper if we can do something to redirect to asked route
      dispatch(push('/chat'))
      resolve(true)
    })
    .catch(err => {
      console.log(err)
      reject({
        '': 'Signup failed',
      })
    })
  })
}

function signOut(){
  return (dispatch) => {

    function afterSignOut(){
      localStorage.removeItem('JWT')
      dispatch({
        type : 'USER_SIGN_OUT'
      })
      dispatch(push('/sign_in'))
    }


    new XHR(hostConfig, {authorization : `Bearer ${localStorage.getItem('JWT')}`}, `${hostConfig.host}/auth/sign_out`).get()
    .then(afterSignOut)
    .catch(afterSignOut)
  }
}


function signIn(credentials, dispatch){

  return new Promise((resolve, reject) => {
    return new XHR(hostConfig, null, `${hostConfig.host}/auth/sign_in`)
    .post(credentials)
    .then(res => {
      localStorage.setItem('JWT', res.token)
      dispatch({
        type : 'USER_SIGN_IN',
        user : res.user
      })

      // Redirect after successfull login
      // TODO -> better see authWrapper if we can do something to redirect to asked route
      dispatch(push('/chat'))
      resolve(true)
    })
    .catch(err => {
      reject({
        '': 'Login failed! Incorrect email/password',
      })
    })
  })
}


function checkEmailAvailability(email) {
	return new XHR(hostConfig, null, `/auth/check_email_availability/${email}`).get()
  .then(res => !!res) //must explicitely reverse value as XHR extract "false" as undefined and we need an explicit "false"
}

function checkUsernameAvailability(username) {
	return new XHR(hostConfig, null, `/auth/check_username_availability/${username}`).get()
  .then(res => !!res) //must explicitely reverse value as XHR extract "false" as undefined and we need an explicit "false"
}



export default {
	checkEmailAvailability,
  checkUsernameAvailability,
  signIn,
  signOut,
  signUp,
  checkSessionStatus
}
