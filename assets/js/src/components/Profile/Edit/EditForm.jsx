import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { pushPath } from 'react-router-redux'
import { Control, Form, Errors, actions as form_actions } from 'react-redux-form'
import Switch from 'react-bootstrap-switch'

import { FormGroup } from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'

import * as actions from 'actions'
import stateInjector from 'util/stateInjector'
import { isEmail } from 'util/validators'

import R from 'ramda'

@stateInjector()
class DateControl extends Component {

  constructor(props){
    super(props)
    this.value = props.defaultValue
  }

  handleChange = newDate => {
    this.value = newDate
    this.props.dispatch(form_actions.change(`editProfile.birthdate`, newDate))
  }

  render(){
    return (
      <DatePicker className="form-control" type="date" value={this.value} id="example-date-input" onChange={this.handleChange} />
    )
  }
}


@stateInjector(['loggedUser'])
export default class EditProfileForm extends Component {
  constructor(props){
    super(props)
    this.resetError = this.resetError.bind(this)
  }

  componentDidUpdate(){this.updateForm()}
  componentDidMount(){this.updateForm()}

  updateForm = () => {
    // Fill the form fileds with values from loggedUser
    const user = this.props.loggedUser
    if(user){
      for(let key in user){
        const val = user[key]
        if(typeof val !== 'undefined'){
          this.props.dispatch(form_actions.change(`editProfile.${key}`, val))
        }
      }
    }
  }

  handleSubmit(userProfile) {
    const newUser = {
      ...R.reject(R.isEmpty, userProfile), // Remove empty values in the submitted form
      id : this.props.loggedUser.id
    }

    // Submit form
    this.props.dispatch(form_actions.submit('editProfile', this.props.actions.updateUser(newUser)));
  }

  resetError(event){
    this.props.dispatch(form_actions.resetValidity(event.target.name), ['available'])
  }

  render() {
    const { loggedUser } = this.props

    return (
      <Form
        model="editProfile"
        onSubmit={account => this.handleSubmit(account)}
        >

        <FormGroup>
          <label>Username</label><br/>
          {loggedUser.username}
        </FormGroup>


        <FormGroup>
          <label htmlFor="inputDescription">Description</label>
          <Control.textarea type="text" model=".description" className="form-control" id="inputDescription" aria-describedby="emailHelp"/>
        </FormGroup>

        <FormGroup>
          <label htmlFor="inputBirthdate">Birthdate</label>
          <Control
            model = ".birthdate"
            component = {DateControl}
            controlProps = {{
              defaultValue : loggedUser.birthdate
            }}
            />
        </FormGroup>

        <fieldset className="form-group">
          <legend>Gender</legend>

          <div className="form-check">
            <label className="form-check-label">
              <Control.radio model=".gender" value="female" className="form-check-input"/>
              Female
            </label>
          </div>

          <div className="form-check">
            <label className="form-check-label">
              <Control.radio model=".gender" value="male" className="form-check-input"/>
              Male
            </label>
          </div>

          <div className="form-check">
            <label className="form-check-label">
              <Control.radio model=".gender" value="other" className="form-check-input"/>
              Other
            </label>
          </div>
        </fieldset>

        <div>
          <label>Accept Private</label>
          <Control.checkbox
            model = ".acceptPrivate"
            component = {Switch}
            controlProps = {{
              defaultValue : loggedUser.acceptPrivate
            }}
            />
        </div>

        <button type="submit" className="btn btn-primary smallMarginRight">
          Update Profile
        </button>
      </Form>
    );
  }
}
