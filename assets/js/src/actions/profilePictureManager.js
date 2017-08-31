import { hostConfig } from '../../config/hostConfig'
import request from 'superagent';


function uploadProfilePicture(picture){

  function start(){
    return {
      type : 'START_PROFILE_PICTURE_UPLOAD'
    }
  }
  function success(url){
    return {
      type : 'SUCCESS_PROFILE_PICTURE_UPLOAD',
      url
    }
  }
  function error(error){
    return {
      type : 'ERROR_PROFILE_PICTURE_UPLOAD',
      error
    }
  }


  return (dispatch) => {

    dispatch(start())

    return new Promise((resolve, reject) => {
      // Upload file to cloudinary
      let upload = request.post(hostConfig.cloudinaryUploadUrl)
      .field('upload_preset', hostConfig.cloudinaryUploadPreset)
      .field('file', picture)

      upload.end((err, response) => {
        if (err){
          dispatch(error(err))
          return reject(err)
        }

        const url = response.body.secure_url

        if (url !== '') {
          dispatch(success(url))
          resolve(url)
        }else{
          dispatch(error('unknown error'))
          reject(err)
        }
      })
    })
  }
}


export default {

  uploadProfilePicture

}
