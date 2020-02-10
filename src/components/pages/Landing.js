import React,{ Component } from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Login from '../pages/auth/LoginModal';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

 class Landing extends Component {

    render() {
        const {history,auth} = this.props;
        return (
            <div className="landingPg">
            <div className="landingWrapper">
                <div className="landingMenu">
                    <h1 className="menuTitle">Have you escaped them <p className="font-italic">all?</p></h1>
                    <span style={{color:'white', fontSize:'30px'}} className="d-flex justify-content-center"><i className="fas fa-key"></i></span>
                    <ul className="landingLinks">
                <li> <Link to="/allCompanies"><Button variant="warning" size="lg" block>Escape Rooms</Button></Link></li>
                {auth.isAuthenticated ? <li> <Link to="/admin"><Button variant="secondary" size="lg" block className="mt-3">Admin</Button></Link></li> :' ' }
                <li><Login history={history}/></li>
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}
Landing.propTypes={
    auth: PropTypes.object.isRequired
  }
  const mapStateToProps = state => ({
    auth:state.auth
  })
export default connect(
    mapStateToProps, null
)(Landing)
