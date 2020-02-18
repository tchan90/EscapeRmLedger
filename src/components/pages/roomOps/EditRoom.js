import React, {Component} from 'react';
import Navigation from '../../layout/Navigation';
import {Form,Button,Container,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getSpecificRoom,editRoom} from '../../../actions/roomActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

class EditRoom extends Component {
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
  //mount ID from URI
  componentDidMount(){
    const { id,roomId } = this.props.match.params;
    this.props.getSpecificRoom(id,roomId);
    //console.log(id + " " + roomId)
  }
  //Display props in the input fields
  componentWillReceiveProps(nextProps){
    const { name, information,difficulty, teamSize} = nextProps.room;
    this.setState({
      name,
     information,difficulty, teamSize
       })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    const { name, information,difficulty, teamSize } = this.state;
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
    const { id,roomId } = this.props.match.params;
    const room = {name, information,difficulty, teamSize};
    try{
      this.props.editRoom(id,roomId,room)
      .then(()=>this.props.history.push('/admin'))
    }catch(error){
      console.log(error);
    }
  };

  render() {
    const {errors,name,information,difficulty,teamSize} = this.state;
    return (
      <div>
         <Navigation/>
        <Container className="mt-5" style={{color:'black'}}>
            <h1>Edit Room</h1>
        <Form className="mt-4" onSubmit={this.handleSubmit}>
  <Form.Group>
    <Form.Control value={name} name="name" type="name" placeholder="Room name"  onChange={this.handleChange}/>
    {errors.name && <p style={{color:'red'}}>Name is required</p>}
  </Form.Group>
  <Form.Group>
  <Form.Control value={information} name="information" as="textarea" rows="3" placeholder="Room information"  onChange={this.handleChange}/>
  {errors.information && <p style={{color:'red'}}>Information is required</p>}
  </Form.Group>
  <Form.Group>
  <Form.Control name="difficulty" onChange={this.handleChange} as="select">
  <option value={difficulty}>{difficulty}</option>
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
  <Form.Control value={teamSize.minNumber} name="minNumber" type="number" onChange={this.handleTeamSize}/>
  </Form.Group>
  {' - '}
  <Form.Group as={Col}>
  <Form.Control value={teamSize.maxNumber} name="maxNumber" type="number" onChange={this.handleTeamSize}/>
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
EditRoom.propTypes={
  editRoom: PropTypes.func.isRequired,
  getSpecificRoom: PropTypes.func.isRequired,
  room:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  room:state.room.room
})
export default connect(mapStateToProps,{getSpecificRoom, editRoom})(EditRoom);