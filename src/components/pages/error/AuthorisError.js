import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function AuthorisError() {
    return (
        <div style={{color:'black'}}>
            <Modal.Dialog>
  <Modal.Header>
    <Modal.Title>Oh no you're not supposed to be here!
    <span> <i className="fas fa-exclamation-triangle"></i>
 </span>
    </Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p>Click below to redirect back to the home page</p>
  </Modal.Body>
  <Modal.Footer>
    <Link to="/"><Button variant="secondary">Return home</Button></Link>
  </Modal.Footer>
</Modal.Dialog>
        </div>
    )
}
