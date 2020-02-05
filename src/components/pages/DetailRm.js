import React from 'react';
import Navigation from '../layout/Navigation';
import {Container,Jumbotron,Accordion,Card} from "react-bootstrap";

 const DetailRm=()=> {
    return (
        <>
        <Navigation />
        <div className="allRoomsWrapper">
          <Container className="pt-4">
            <Jumbotron fluid style={{background:'url(https://images.unsplash.com/photo-1565112790605-b21e760033e5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9) no-repeat bottom center/cover', position:'relative'}}>
                <Container >
                <h1 style={{color:'white'}}>TRAPT Bar</h1>
                </Container>
            </Jumbotron>
            <div className="d-flex justify-content-between" style={{ fontSize:'20px'}}>
                <p>Website <span><i class="fas fa-tv"></i></span> </p>
                <p>Location: Collin St, Melbourne 3000</p>
            </div>
            <div>
                <p style={{padding:'15px 15px'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia, magna ut bibendum rutrum, turpis ipsum sagittis metus, et facilisis mi tortor id odio. Nullam ornare est eros, non volutpat magna interdum sed. Vivamus venenatis rutrum diam, vitae gravida leo. Cras semper ac diam a aliquam.   
                </p>
                <h2 className="pt-4">Rooms</h2>
                <Accordion>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0" style={{backgroundColor:'black'}}>
      S.P.A.C.E
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body style={{backgroundColor:'black'}}>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1" style={{backgroundColor:'black'}}>
      Click me!
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body style={{backgroundColor:'black'}}>Hello! I'm another body</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
            </div>
          </Container>
        </div>
      </>
    )
}
export default DetailRm