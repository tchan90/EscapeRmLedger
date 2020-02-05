import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addRoom} from '../../../actions/roomActions';
import Navigation from '../../layout/Navigation';
import {Form,Button,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

 class AddRoom extends Component {
   state={
     name:'',
     information:'',
     errors:{}
   }
   handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    const { name, information } = this.state;
    //check errors
    if(name ===''){
      this.setState({
        errors:{name:'Please enter name'}
      });
      return;
    }
    if(information ===''){
      this.setState({
        errors:{information:'Please enter information'}
      });
      return;
    }
    const { id } = this.props.match.params;
    const room = { name,information};
    try{
      this.props.addRoom(id,room)
      .then(()=>this.props.history.push('/admin'))
    }catch(error){
      console.log(error);
    }
  };

  render() {
    const {errors} = this.state
    return (
      <div>
         <Navigation/>
        <Container className="m-5" style={{color:'black'}}>
            <h1>Add New Room</h1>
        <Form className="mt-4"  onSubmit={this.handleSubmit}>
  <Form.Group>
    <Form.Control name="name" type="name" placeholder="Company name" onChange={this.handleChange}/>
    {errors.name && <p style={{color:'red'}}>Name is required</p>}
  </Form.Group>
  <Form.Group>
  <Form.Control name="information" as="textarea" rows="3" placeholder="Company information" onChange={this.handleChange}/>
  {errors.information && <p style={{color:'red'}}>Information is required</p>}
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button> {' '}
  <Link to="/admin"><Button variant="secondary">
    Cancel
  </Button></Link>
</Form>
</Container>
      </div>
    )
  }
}

AddRoom.propTypes={
  addRoom: PropTypes.func.isRequired
}
export default connect(null,{addRoom})(AddRoom);