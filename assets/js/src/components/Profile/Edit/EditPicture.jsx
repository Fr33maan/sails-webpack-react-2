// Libs && utils
import React, {
  Component,
  PropTypes
} from 'react';

import { Control, Form, Errors, actions as form_actions } from 'react-redux-form'

import stateInjector from 'util/stateInjector'
import Dropzone    from 'react-dropzone';

@stateInjector(['profilePictureUrl', 'profilePictureUploadStatus', 'loggedUser'])
export default class ProfilePicture extends Component {

  uploadPicture = (files) => {

    const { uploadProfilePicture, updateUser } = this.props.actions

    uploadProfilePicture(files[0])
    .then(url => {
      this.props.dispatch(form_actions.change('editProfile.profilePicture', url))
    })
  }

  deletePicture = () => {
    this.props.dispatch({
      type : 'DELETE_PROFILE_PICTURE'
    })

    this.props.dispatch(form_actions.change('editProfile.profilePicture', null))
  }


  render() {

    const { profilePictureUploadStatus, profilePictureUrl, loggedUser} = this.props

    const uploading  = profilePictureUploadStatus.uploading
    const uploaded   = profilePictureUploadStatus.uploaded

    return (
      <div className="FileUpload">
        {
          (!uploading && !uploaded && !profilePictureUrl) &&
          <Dropzone
            multiple={false}
            accept="image/jpg,image/jpeg,image/png"
            onDrop={this.uploadPicture}>
            <p>Drop an image or click to select a file to upload. </p>
          </Dropzone>
        }
        {
          (uploading && !uploaded && !profilePictureUrl) &&
          <p>Uploading image ...</p>
        }
        {
          ((!uploading && uploaded) || profilePictureUrl) &&
            <div>
              <div>
                <img className={"profile_img"} src={profilePictureUrl}/>
              </div>
              <div className="text-center smallMarginTop">
                <button onClick={this.deletePicture} className="btn btn-danger">Delete picture</button>
              </div>
            </div>
        }
      </div>
    )
  }
}
