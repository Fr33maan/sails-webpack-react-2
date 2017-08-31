import stateInjector from 'util/stateInjector'

import React, {
  Component,
  PropTypes
} from 'react';

import {Grid, Row, Col } from 'react-bootstrap'
import NotificationSystem from 'react-notification-system';

import Menu from './Menu'
import { push } from 'react-router-redux'

require('styles/App.scss')
require('styles/other/Header.scss')

@stateInjector(['notifications', 'subscribedChannels'])
export default class App extends Component {

  componentWillMount() {

    const { router, actions, dispatch } = this.props
    const self = this // HAX Needed to access props without rerender component

    // Listen socket events


    async function log(){
      await actions.checkSessionStatus()

      // Redirect to /chat only if no route is given
      if(router.location.pathname === '/') dispatch(push('/sign_in'))
    }

    log().then()
    .catch(actions.signOut)
  }

  componentDidUpdate(){
    const {notifications} = this.props

    if(notifications && notifications.length){
      notifications.forEach(this.refs.notificationSystem.addNotification)
      this.props.dispatch({
        type : 'CLEAR_NOTIFICATIONS'
      })
    }
  }


  render() {
    // Render the child routes
    return (
      <Grid>
        <div>
          <NotificationSystem ref="notificationSystem" />
        </div>
        <Row className={"header row-flex row-flex-wrap"}>
          <Col sm={1} xs={12} className={"logo"}>
            <div>
              <h1>SailsReactWebpack</h1>
            </div>
          </Col>
          <Col sm={11} xs={12}>
            <Menu/>
          </Col>
        </Row>
        {this.props.children}
      </Grid>
    );
  }
}
