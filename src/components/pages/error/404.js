import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'

function ErrorPage() {
    return (
        <Modal.Dialog style={{color:'black'}}>
  <Modal.Header>
    <Modal.Title>Oops you made a wrong turn</Modal.Title>
    <i className="fas fa-exclamation-circle" style={{fontSize:'30px'}}></i>
  </Modal.Header>

  <Modal.Body>
    <p>Lets take you back home</p>
  </Modal.Body>

  <Modal.Footer>
    <Link to="/"><Button variant="primary">Ok</Button> </Link>
  </Modal.Footer>
</Modal.Dialog>
    )
}
export default ErrorPage