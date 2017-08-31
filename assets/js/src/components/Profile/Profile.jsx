import React, {
  Component,
  PropTypes
} from 'react';
import stateInjector from 'util/stateInjector'
import * as actions from 'actions'

import { Row, Col, PageHeader } from 'react-bootstrap'



@stateInjector(['user'])
export default class Profile extends Component {

  render() {

    return (
      <Row>
        <Col xs={12}>
          Profile
        </Col>
      </Row>
    );
  }
}
