
function profilePictureUrl(state = null, action){
  switch (action.type) {

    case 'USER_BACK':
    case 'USER_SIGN_IN':
      return action.user.profilePicture

    case 'SUCCESS_PROFILE_PICTURE_UPLOAD':
      return action.url

    case 'DELETE_PROFILE_PICTURE':
      return null

    default:
      return state
  }
}


const profilePictureUploadStatusInitialState = {
  uploading: false,
  uploaded : false
}
function profilePictureUploadStatus(state = profilePictureUploadStatusInitialState, action){
  switch (action.type) {

    case 'START_PROFILE_PICTURE_UPLOAD':
      return {
        uploading: true,
        uploaded : false
      }

    case 'SUCCESS_PROFILE_PICTURE_UPLOAD':
      return {
        uploading: false,
        uploaded : true
      }

    case 'ERROR_PROFILE_PICTURE_UPLOAD':
    case 'DELETE_PROFILE_PICTURE':
      return profilePictureUploadStatusInitialState

    default:
      return state
  }
}



export default {
  profilePictureUrl,
  profilePictureUploadStatus
}
