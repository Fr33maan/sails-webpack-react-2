

// Libs && utils
import React, {
  Component,
  PropTypes
} from 'react';

// Components
import { Row, Col, Panel } from 'react-bootstrap'

import EditForm    from './EditForm'
import EditPicture from './EditPicture'
import stateInjector from 'util/stateInjector'


require('Profile/Edit.scss')

@stateInjector(['loggedUser'])
export default class EditProfile extends Component {

  render() {

    const { loggedUser } = this.props

    return (
      <Row>
        <Col mdOffset={2} md={8} xs={12}>
          <Panel header="Profile" bsStyle="primary">
            <Row>
              <Col xs={12} sm={4}>
                {loggedUser && <EditPicture />}
              </Col>
              <Col xs={12} sm={8}>
                {loggedUser && <EditForm />}
              </Col>
            </Row>
          </Panel>
        </Col>
      </Row>
    );
  }
}
