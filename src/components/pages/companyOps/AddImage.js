import React, { Component } from "react";
import { Container,Spinner,Form,Button } from "react-bootstrap";
import {connect} from 'react-redux';
import {editCompany} from '../../../actions/companyActions';
import {Link} from 'react-router-dom';

class AddImage extends Component {
  state = {
    uploading: false,
    image: [],
    imageURL:''
  };
//upload image to Cloudinary
  onChangeImg = e => {
    const files = Array.from(e.target.files);
    this.setState({ uploading: true });

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    fetch("http://localhost:5000/image-upload", {
      method: "POST",
      body: formData
    })
       .then(this.setState({uploading:true}))   
      .then(res =>res.json())
      .then(image => {
        this.setState({
          uploading: false,
          image,
          imageURL:image[0].url
        });
      });
  };
  //update in db
submitImg=(e)=>{
  e.preventDefault();
  const { id } = this.props.match.params;
  const {imageURL} = this.state;
  const company = {imageURL}
  try{
    this.props.editCompany(id,company)
    .then(()=>this.props.history.push('/admin'))
    console.log(company)
  }catch(error){
    console.log(error);
  }
}

  render() {
    const { uploading, image } = this.state;
    const uploadState = () => {
      if (uploading) {
        return (
          <>
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
                </Spinner>
          </>
        );
      }
    };
    return (
      <div style={{color:'black'}}>
        <Form onSubmit={this.submitImg} style={{width:'880px'}} className="mx-auto"> 
        <div>  
          <h1 className="mt-3">Replace Company Avatar</h1>
        <input name="image" onChange={this.onChangeImg} type="file" className="my-3"/>
        <div>
        {uploadState()}
        </div>
        <Container>
        {image.map((img, i) => (
              <img src={img.url} alt="company img" key={i} className="w-50 my-3" />
            ))}{" "}
        </Container>
        <div className="d-flex justify-content-center"> 
        <Button type="submit" variant="success">Submit</Button>
        <Link to="/admin"><Button type="submit" variant="secondary" className="mx-2">Cancel</Button></Link>
        </div>
        </div>
        </Form>
      </div>
    );
  }
}
export default connect(null,{editCompany})(AddImage);
