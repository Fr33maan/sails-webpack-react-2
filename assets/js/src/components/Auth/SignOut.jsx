import stateInjector from 'util/stateInjector'

import React, {
  Component,
  PropTypes
} from 'react';

import { push } from 'react-router-redux'
import R from 'ramda'

@stateInjector(['subscribedChannels'])
export default class SignOut extends Component {

  componentWillMount() {
    const { actions, subscribedChannels } = this.props
    // actions.unsubscribeFromChannels(subscribedChannels)
    actions.signOut()
    this.props.dispatch({
      type : 'RESET'
    })
  }

  render() {
    return ( <span></span> )
  }
}
