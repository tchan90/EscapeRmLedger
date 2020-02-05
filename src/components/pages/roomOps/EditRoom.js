import React, {Component} from 'react';
import Navigation from '../../layout/Navigation';
import {Form,Button,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getSpecificRoom,editRoom} from '../../../actions/roomActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

class EditRoom extends Component {
  state={
    name:'',
    information:'',
    errors:{}
  }
  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  //mount ID from URI
  componentDidMount(){
    const { id,roomId } = this.props.match.params;
    this.props.getSpecificRoom(id,roomId);
    //console.log(id + " " + roomId)
  }
  //Display props in the input fields
  componentWillReceiveProps(nextProps){
    const { name, information} = nextProps.room;
    this.setState({
      name,
     information
       })
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
    const { id,roomId } = this.props.match.params;
    const room = {name, information};
    try{
      this.props.editRoom(id,roomId,room)
      .then(()=>this.props.history.push('/admin'))
    }catch(error){
      console.log(error);
    }
  };

  render() {
    const {errors,name,information} = this.state;
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