
function loggedUser(state = null, action){
  switch (action.type) {

    case 'USER_BACK':
    case 'USER_SIGN_UP':
    case 'USER_SIGN_IN':
      return action.user

    case 'USER_UPDATE_SUCCESS':
      return {
        ...state,
        ...action.user
      }

    case 'USER_SIGN_OUT':
      return null

    default:
      return state
  }
}



export default {
  loggedUser
}
