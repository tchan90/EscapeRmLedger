import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addRoom} from '../../../actions/roomActions';
import Navigation from '../../layout/Navigation';
import {Form,Button,Container,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

 class AddRoom extends Component {
   state={
     name:'',
     information:'',
     difficulty:'',
     teamSize:{
       minNumber:'',
       maxNumber:''
     },
     errors:{}
   }
   handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  handleTeamSize=(e)=>{
    const{teamSize} = {...this.state};  //get current state of teamSize
    const currentState = teamSize;
    const {name,value} = e.target;  //destructure the emitted events from input fields
    currentState[name] = value;  //update the state

    this.setState({teamSize:currentState})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, information, difficulty,teamSize } = this.state;
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
    if(difficulty ===''){
      this.setState({
        errors:{difficulty:'Please enter difficulty'}
      });
      return;
    }
    if(teamSize.minNumber ===''){
      this.setState({
        errors:{minNumber:'Please enter minimum number'}
      });
      return;
    }
    if(teamSize.maxNumber ===''){
      this.setState({
        errors:{maxNumber:'Please enter maximum number'}
      });
      return;
    }
    if(teamSize.minNumber > teamSize.maxNumber){
      this.setState({
        errors:{minNumber:'Minimum number must be smaller than maximum number'}
      });
      return;
    }
    const { id } = this.props.match.params;
    const room = { name,information,difficulty, teamSize};
    try{
      this.props.addRoom(id,room)
      .then(()=>this.props.history.push('/admin'))
      console.log(room)
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
    <Form.Control name="name" type="name" placeholder="Room name" onChange={this.handleChange}/>
    {<p style={{color:'red'}}>{errors.name}</p>}
  </Form.Group>
  <Form.Group>
  <Form.Control name="information" as="textarea" rows="3" placeholder="Room information" onChange={this.handleChange}/>
  { <p style={{color:'red'}}>{errors.information} </p>}
  </Form.Group>
  <Form.Group>
  <Form.Control name="difficulty" onChange={this.handleChange} as="select">
  <option value=''>Difficulty -- Please Choose</option>
  <option>Easy</option>
  <option>Medium</option>
  <option>Hard</option>
  </Form.Control>
  {<p style={{color:'red'}}>{errors.difficulty}</p>}
  </Form.Group>
  <br/>
  <Form.Row> 
    <p>Team Size: </p>
  <Form.Group as={Col}>
  <Form.Control name="minNumber" type="number" onChange={this.handleTeamSize}/>
  </Form.Group>
  {' - '}
  <Form.Group as={Col}>
  <Form.Control name="maxNumber" type="number" onChange={this.handleTeamSize}/>
  </Form.Group>
  </Form.Row>
  {<p style={{color:'red'}}>{errors.minNumber}</p>}
  {<p style={{color:'red'}}>{errors.maxNumber}</p>}
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