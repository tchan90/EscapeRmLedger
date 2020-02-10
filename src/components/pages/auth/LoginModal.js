import React, { Component } from 'react';
import {Modal,Form,Button,FormGroup,Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../../actions/authActions';
import SignOut from '../auth/SignOut'

 class LoginModal extends Component {
     state={
         modal:false,
         email:'',
         password:'',
         msg:null,
     }
     onChange=e=>{
         this.setState({[e.target.name]:e.target.value})
     }
     componentDidUpdate(prevProps){
        const {error,isAuthenticated} = this.props;
        if (error !== prevProps.error){
            //check for login error
            if (error.id === 'LOGIN_FAIL'){
                this.setState({msg: error.msg.msg});
            }else{
                this.setState({msg:null})
            }
        }
        if (this.state.modal) {
            if(isAuthenticated){
                this.props.history.push('/admin')
                //this.toggle();
            }
          }
    }

     toggle=()=>{
         this.setState({
            modal:!this.state.modal
         })
     }
     onSubmit=(e)=>{
        e.preventDefault();
        const user = {
            email:this.state.email,
            password:this.state.password
        }
        this.props.login(user);
        console.log('login success')
     }

    render() {
        const{email,password} = this.state;
        const{isAuthenticated,history} = this.props;
        return (
<div> 
    {isAuthenticated?<SignOut history={history}/>: <Button variant="secondary" href="#" size="lg" block style={{marginTop:'15px'}} onClick={this.toggle}>Login</Button> }

            <Modal show={this.state.modal} toggle={this.toggle}>
            <Form onSubmit={this.onSubmit}>
            <Modal.Header toggle={this.toggle}>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {this.state.msg ?  <Alert variant="danger">{this.state.msg}</Alert> : null }
                <FormGroup>
                    <Form.Control
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Add email"
                    onChange={this.onChange}
                    value={email}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Add password"
                    onChange={this.onChange}
                    value={password}
                    />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.toggle}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
            </Form>
          </Modal>
          </div>
        )
    }
}
LoginModal.propTypes={
    login: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
    error:PropTypes.object.isRequired,
  }
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error:state.error,
  })
export default connect(mapStateToProps,{login})(LoginModal)