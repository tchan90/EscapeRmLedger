import React, {Component, Fragment} from 'react';
import Navigation from '../layout/Navigation';
import {Accordion,Card,Table,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCompanies} from '../../actions/companyActions';
import {deleteRoom} from '../../actions/roomActions';
import DeleteCompany from '../../components/pages/companyOps/DeleteCompany';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

class Admin extends Component {
  componentDidMount(){
    this.props.getCompanies();
  }
  deleteRoom = (id,roomId)=>{
    //console.log(id + ' ' + roomId)
    if(window.confirm('Are you sure you want to delete this?'))
    {
      this.props.deleteRoom(id,roomId)
      .then(window.location.reload())
    }
  }
  render() {
    const {companies,auth} = this.props;
    //console.log(companies);
    if(auth.isAuthenticated){
      return (
        <div className="adminBg my-2">
              <Navigation/>
              <h1 style={{color:'black'}} className="p-4">All Companies</h1>
              <Accordion style={{width:'50rem', textAlign:'center'}} className="mx-auto">
              {companies.map(company =>
              {
                const rooms = company.rooms;
                return(
                  <Card key={company._id}>
                  <Card.Header>
                    <Accordion.Toggle as={Card.Header} eventKey={company._id} style={{color:'black', cursor:'pointer'}}>
                  {company.name} {'('} {rooms.length} {')'}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={company._id}>
                <Card.Body>
                <Link to={`/addImg/${company._id}`}><img src={company.imageURL} className="my-2 rounded-circle w-25 ml-auto "/></Link> 
                  <div className="d-flex justify-content-between"> 
                 <Link to={`/addRoom/${company._id}`}><p className="p-1">Add Room</p></Link>{' '} <Link to={`/editCompany/${company._id}`}><p className="p-1">Edit Company</p></Link>
                <DeleteCompany id={company._id}></DeleteCompany>
                </div>  
                <Table striped bordered hover>
            <tbody>
                {rooms.map(room => 
                    {
                  return <Fragment  key={room._id}> 
                  <tr style={{textAlign:'center'}}>
                  <td>{room.name}</td>
                  <td>  <Link to={`/editRoom/${company._id}/${room._id}`}><Button variant="warning" className="mr-2">Edit</Button></Link>
                  <Button variant="danger" onClick={()=> {this.deleteRoom(company._id,room._id)}}>Delete</Button>
                         </td></tr> 
                         </Fragment>
                })}
            </tbody>
          </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
                    )   
              }
              )}
        
  </Accordion>
  <div className="d-flex justify-content-center pt-2">
      <Link to="/addCompany"> 
  <i className="fas fa-plus-circle" style={{color:'black', fontSize:'40px'}}></i></Link>
  </div>
          </div>
      )
    }
  else{
    return(
      <div>
          <Redirect to="/"/>
      </div>
    )
  }
  }
}

Admin.propTypes={
  getCompanies: PropTypes.func.isRequired,
  companies:PropTypes.array.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  companies:state.company.companies,
  auth:state.auth
})
export default connect(mapStateToProps, {getCompanies,deleteRoom})(Admin);


