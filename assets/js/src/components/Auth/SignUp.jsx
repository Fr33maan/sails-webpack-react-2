import { hostConfig } from '../../../config/hostConfig'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { pushPath } from 'react-router-redux'
import { Control, Form, Errors, actions as form_actions } from 'react-redux-form'
import * as actions from 'actions'
import stateInjector from 'util/stateInjector'
import { isEmail } from 'util/validators'
var Recaptcha = require('react-gcaptcha');
import { Row, Col, Panel } from 'react-bootstrap'

require('styles/Auth/SignUp.scss')

class Captcha extends Component {
  render(){
    <Recaptcha
      sitekey={hostConfig.recaptchaSiteKey}
      verifyCallback={this.props.handleRecaptcha}
      />
  }
}


@stateInjector()
export default class SignUpForm extends Component {
  constructor(props){
    super(props)
    this.resetError      = this.resetError.bind(this)
    this.handleRecaptcha = this.handleRecaptcha.bind(this)
  }

  handleRecaptcha(key) {
    this.props.dispatch(form_actions.change('signUp.recaptchaKey', key))
  }

  handleSubmit(account) {
    this.props.dispatch(form_actions.submit('signUp', actions.signUp(account, this.props.dispatch)));
  }

  resetError(event){
    const field = event.target.name
    this.props.dispatch(form_actions.resetValidity(field), ['available'])
  }

  render() {
    return (
      <Row>
        <Col mdOffset={2} md={8} xs={12}>
          <Panel className="text-center" header="Sign Up" bsStyle="primary">
            <Form
              model="signUp"
              onSubmit={account => this.handleSubmit(account)}
              validators = {{
                '' : {
                  passwordsMatch : fields => (fields.confirmPassword.length === 0 || fields.confirmPassword === fields.password),
                  hasRecaptcha : fields => fields.recaptchaKey
                }
              }}
              >

              <div className="form-group">
                <label>Username</label>
                <Control.text
                  type="text"
                  model=".username"
                  className = "form-control"
                  validators={{
                    required: val => val.length
                  }}
                  asyncValidators={{
                    available: (val, done) => actions.checkUsernameAvailability(val).then(res => done(res))
                  }}
                  onChange = {this.resetError}
                  />
                <Errors  className="errors"  model=".username"  messages = {{  required : 'Please provide a username' }} wrapper="span"/>
                <Errors  className="errors"  model=".username"  messages = {{ available  : val => `${val} is already used. Please choose another username`}}  wrapper="span"/>
              </div>


              <div className="form-group">
                <label>Email</label>
                <Control.text
                  type="email"
                  model=".email"
                  className = "form-control"
                  validators={{
                    required: val => val.length,
                    isEmail
                  }}
                  asyncValidators={{
                    available: (val, done) => actions.checkEmailAvailability(val).then(res => done(res))
                  }}
                  onChange = {this.resetError}
                  asyncValidateOn={['blur']}
                  />
                <Errors  className="errors"  model=".email"  messages = {{  required : 'Please provide an email address' }} wrapper="span"/>
                <Errors  className="errors"  model=".email"  messages = {{  isEmail  : val => `${val} is not an email address`  }}  show = {field => field.validity.required} wrapper="span" />
                <Errors  className="errors"  model=".email"  messages = {{ available  : val => `${val} is already used. Please choose another address`}}  wrapper="span"/>
              </div>



              <div className="form-group">
                <label>Password</label>
                <Control type="password" model=".password" className = "form-control" validators = {{minLength6 : val => val.length >= 6}}/>
                <Errors className="errors" model=".password" messages = {{minLength6  : 'Password must be at least 6 characters long'}}  wrapper="span"/>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <Control  type="password"  model=".confirmPassword" className = "form-control"/>
              </div>

              <div className="form-group">
                <Control
                  model = "signUp.recaptchaKey"
                  className = "form-control"
                  component = {Recaptcha}
                  controlProps = {{
                    sitekey : hostConfig.recaptchaSiteKey,
                    verifyCallback : this.handleRecaptcha
                  }}
                  />
                <Errors  className="errors"  model="signUp"  messages = {{ hasRecaptcha : 'Please ensure you are not a robot', passwordsMatch : 'Password does not match' }} component="div"/>
              </div>
              <button type="submit" className="btn btn-primary smallMarginRight">
                Create account
              </button>
              <Control.reset model="signUp" className="btn">
                Clear Values
              </Control.reset>
              <div className="smallMarginTop">
                <Link to="/sign_in"> Already have an account ? Click here to sign in </Link>
              </div>
            </Form>
          </Panel>
        </Col>
      </Row>

    );
  }
}
