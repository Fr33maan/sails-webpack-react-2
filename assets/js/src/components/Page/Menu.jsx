import { Link } from 'react-router'
import React, {
  Component,
  PropTypes
} from 'react';

import { UserComponentWrapper } from 'util/authWrappers'
import { Row, Col } from 'react-bootstrap'


@UserComponentWrapper
export default class Menu extends Component {

  render() {

    return (
      <Row className={"menu"}>
        <Col sm={2}><Link to="/profile">      Profile</Link></Col>
        <Col sm={2}><Link to="/sign_out">     Sign Out</Link></Col>
      </Row>
    )
  }
}
