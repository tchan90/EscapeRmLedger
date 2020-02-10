import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from '../../actions/authActions';

 function Navigation({auth,logout}) {
    return (
        <Navbar bg="dark" variant="dark">
    <Nav className="ml-auto">
      <Nav.Link href="/allCompanies">Escape Rooms</Nav.Link>
      {auth.isAuthenticated ?  <Nav.Link href="#login" onClick={logout}>SignOut</Nav.Link> : <Nav.Link href="#login">Login</Nav.Link>
}
    </Nav>
  </Navbar>
    )
}
Navigation.propTypes={
  auth:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth:state.auth,
  logout: PropTypes.func.isRequired
})
export default connect(mapStateToProps, {logout}) (Navigation);