import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addCompany} from '../../../actions/companyActions';
import Navigation from '../../layout/Navigation';
import {Form,Button,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';


 class AddCompany extends Component {
   state={
     name:'',
     address:'',
     information:'',
     website:'',
     url:'',
     errors:{}
   }
   handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    const { name, address, information, website, url } = this.state;
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
    if(url ===''){
      this.setState({
        errors:{url:'Please enter url'}
      });
      return;
    }
    const company = { name, address, information, website, url};
    try{
      this.props.addCompany(company)
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
            <h1>Add New Company</h1>
        <Form className="mt-4"  onSubmit={this.handleSubmit}>
  <Form.Group>
    <Form.Control name="name" type="name" placeholder="Company name" onChange={this.handleChange}/>
    {errors.name && <p style={{color:'red'}}>Name is required</p>}
  </Form.Group>
  <Form.Group>
    <Form.Control name="address" type="text" placeholder="Company address" onChange={this.handleChange}/>
    {errors.address && <p style={{color:'red'}}>Address is required</p>}
  </Form.Group>
  <Form.Group>
  <Form.Control name="information" as="textarea" rows="3" placeholder="Company information" onChange={this.handleChange}/>
  {errors.information && <p style={{color:'red'}}>Information is required</p>}
  </Form.Group>
  <Form.Group>
    <Form.Control name="website" type="text" placeholder="Website" onChange={this.handleChange}/>
    {errors.website && <p style={{color:'red'}}>Website Address is required</p>}
  </Form.Group>
  <Form.Group>
    <Form.Control name="url" type="text" placeholder="Image URL" onChange={this.handleChange}/>
    {errors.url && <p style={{color:'red'}}>Image URL is required</p>}
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

AddCompany.propTypes={
  addCompany: PropTypes.func.isRequired
}
export default connect(null,{addCompany})(AddCompany);