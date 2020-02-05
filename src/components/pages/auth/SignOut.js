import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {logout} from '../../../actions/authActions';
import PropTypes from 'prop-types'


 class SignOut extends Component {
     static propTypes = {
         logout: PropTypes.func.isRequired
     }
    render() {
        return (
            <Fragment>
 <Button variant="info" onClick={this.props.logout} size="lg" block style={{marginTop:'15px'}} href="">
        Sign Out 
      </Button>
            </Fragment>
        )
    }
}
export default connect(
    null, {logout}
)(SignOut)