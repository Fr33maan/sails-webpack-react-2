import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { pushPath } from 'react-router-redux'
import { Control, Form, Errors, actions as form_actions } from 'react-redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import stateInjector from 'util/stateInjector'
import { isEmail } from 'util/validators'
import { Row, Col, Panel } from 'react-bootstrap'

@connect()
export default class SignInForm extends Component {
  handleSubmit(credentials) {
    this.props.dispatch(form_actions.submit('signIn', actions.signIn(credentials, this.props.dispatch)));
  }

  render() {
    return (
      <Row>
        <Col mdOffset={2} md={8} xs={12}>
          <Panel className="text-center" header="Sign In" bsStyle="primary">
            <Form model="signIn" onSubmit={credentials => this.handleSubmit(credentials)}>
              <Errors  model="signIn"/>
              <div className="form-group">
                <Errors
                  className="errors"
                  model=".email"
                  messages = {{
                    required : 'Please provide an email address',
                  }}
                />
                <Errors
                  className="errors"
                  model=".email"
                  messages = {{
                    isEmail  : val => `${val} is not an email address`
                  }}
                  show = {field => field.validity.required}
                />
                <Errors
                  className="errors"
                  model=".email"
                  messages = {{
                    available  : val => `${val} is already used. Please choose another address`
                  }}
                />
                <label htmlFor="email">Email</label>
                <Control.text
                  type="email"
                  id="email"
                  model=".email"
                  placeholder="exemple@email.com"
                  className = "form-control"
                  validators={{
                    required: (val) => val.length,
                    isEmail
                  }}
                />
              </div>



              <div className="form-group">
                <Errors
                  className="errors"
                  model=".password"
                  messages = {{
                    minLength6  : 'Password must be at least 6 characters long'
                  }}
                />
              <label htmlFor="password">Password</label>
                <Control
                  type="password"
                  id="password"
                  placeholder="Your very secret password"
                  model=".password"
                  className = "form-control"
                  validators = {{
                    minLength6 : val => val.length >= 6
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary smallMarginRight">
                Log In
              </button>
              <Control.reset model="signIn" className="btn">
                Clear Values
              </Control.reset>
              <div>
                <Link to="/sign_up"> Don't have an account yet ? Click here to sign up </Link>
              </div>
            </Form>
          </Panel>
        </Col>
      </Row>
    )
  }
}
