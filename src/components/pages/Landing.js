import React,{ Component } from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Login from '../pages/auth/LoginModal';

 class Landing extends Component {
    state={
        isOpen:false
    }

    toggle=()=>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render() {
        return (
            <div className="landingPg">
            <div className="landingWrapper">
                <div className="landingMenu">
                    <h1 className="menuTitle">Have you escaped them <p className="font-italic">all?</p></h1>
                    <span style={{color:'white', fontSize:'30px'}} className="d-flex justify-content-center"><i className="fas fa-key"></i></span>
                    <ul className="landingLinks">
                <li> <Link to="/allCompanies"><Button variant="warning" size="lg" block>Escape Rooms</Button></Link></li>
                <li><Login/></li>
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}
export default Landing
