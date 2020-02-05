import React, { Component } from "react";
import Navigation from "../layout/Navigation";
import { Container, Card, Row, Col } from "react-bootstrap";
import {Link} from 'react-router-dom'

class AllRooms extends Component {
  render() {
    return (
      <>
        <Navigation />
        <div className="allRoomsWrapper">
          <Container className="pt-4">
            <Row>
              <Col>
                <Link to="/escapeRm">
                    <Card bg="dark" className="roomCard">
                  <Card.Body style={{background:'url(https://images.unsplash.com/photo-1565112790605-b21e760033e5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9) no-repeat bottom center/cover', position:'relative'}}>
                      <div className="overlay">
                          <div className="innerText">
                          <h2>TRAPT Bar</h2>
                            <p>Collin St</p>
                          </div>
                      </div>
                  </Card.Body>
                </Card></Link>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
export default AllRooms;
