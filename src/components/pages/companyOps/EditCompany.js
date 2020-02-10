import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCompany,editCompany} from '../../../actions/companyActions';
import Navigation from '../../layout/Navigation';
import {Form,Button,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';


 class EditCompany extends Component {
   state={
     name:'',
     address:'',
     information:'',
     website:'',
     errors:{}
   }
   handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  //mount ID from URI
  componentDidMount(){
    const { id } = this.props.match.params;
    this.props.getCompany(id);
  }
  //Display props in the input fields
  componentWillReceiveProps(nextProps){
    const { name, address, information, website } = nextProps.company;
    this.setState({
      name,
     address,
     information,
     website,
         })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    const { name, address, information, website } = this.state;
    //check errors
    if(name ===''){
      this.setState({
        errors:{name:'Please enter name'}
      });
      return;
    }
    if(address ===''){
      this.setState({
        errors:{address:'Please enter address'}
      });
      return;
    }
    if(information ===''){
      this.setState({
        errors:{information:'Please enter information'}
      });
      return;
    }
    if(website ===''){
      this.setState({
        errors:{website:'Please enter website'}
      });
      return;
    }
    const { id } = this.props.match.params;
    const company = { name, address, information, website};
    try{
      this.props.editCompany(id,company)
      .then(()=>this.props.history.push('/admin'))
    }catch(error){
      console.log(error);
    }
  };

  render() {
    const {errors,name,address,information,website} = this.state
    return (
      <div>
         <Navigation/>
        <Container className="m-5" style={{color:'black'}}>
            <h1>Edit New Company</h1>
        <Form className="mt-4"  onSubmit={this.handleSubmit}>
  <Form.Group>
    <Form.Control value={name} name="name" type="name"  onChange={this.handleChange}/>
    {errors.name && <p style={{color:'red'}}>Name is required</p>}
  </Form.Group>
  <Form.Group>
    <Form.Control value={address} name="address" type="text" placeholder="Company address" onChange={this.handleChange}/>
    {errors.address && <p style={{color:'red'}}>Address is required</p>}
  </Form.Group>
  <Form.Group>
  <Form.Control value={information} name="information" as="textarea" rows="3" placeholder="Company information" onChange={this.handleChange}/>
  {errors.information && <p style={{color:'red'}}>Information is required</p>}
  </Form.Group>
  <Form.Group>
    <Form.Control value={website} name="website" type="text" placeholder="Website" onChange={this.handleChange}/>
    {errors.website && <p style={{color:'red'}}>Website Address is required</p>}
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

EditCompany.propTypes={
  editCompany: PropTypes.func.isRequired,
  getCompany: PropTypes.func.isRequired,
  company:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  company:state.company.company
})
export default connect(mapStateToProps,{getCompany, editCompany})(EditCompany);