import React, { Component } from "react";
import Navigation from "../layout/Navigation";
import { Container, Jumbotron, Accordion, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCompany } from "../../actions/companyActions";
import { getAllRooms } from "../../actions/roomActions";

class CompanyPg extends Component {
	componentDidMount() {
		this.props.getCompany(this.props.match.params.id);
		this.props.getAllRooms(this.props.match.params.id);
	}
	render() {
		const { company, rooms } = this.props;
		return (
			<>
				<Navigation />
				<div className="allRoomsWrapper">
					<Container className="pt-4">
						<Jumbotron
							fluid
							style={{
								background: `url(${company.imageURL}) no-repeat bottom center/cover`,
								position: "relative"
							}}
						>
							<Container>
								<h1 style={{ color: "white" }}>{company.name}</h1>
							</Container>
						</Jumbotron>
						<div
							className="d-flex justify-content-between"
							style={{ fontSize: "20px" }}
						>
							<p>
								Website{" "}
								<span>
									<a href={company.website}>
										<i className="fas fa-tv"></i>
									</a>
								</span>{" "}
							</p>
							<p style={{ fontSize: "15px" }}>{company.address}</p>
						</div>
						<div>
							<p style={{ padding: "15px 15px" }}>{company.information}</p>
							<h2 className="pt-4">Rooms</h2>
							<Accordion>
								{rooms.map(room => {
									return (
										<Card key={room._id}>
											<Accordion.Toggle
												as={Card.Header}
												eventKey={room._id}
												style={{ backgroundColor: "black" }}
											>
												{room.name}
											</Accordion.Toggle>
											<Accordion.Collapse eventKey={room._id}>
												<Card.Body style={{ backgroundColor: "black" }}>
													{room.information}
												</Card.Body>
											</Accordion.Collapse>
										</Card>
									);
								})}
							</Accordion>
						</div>
					</Container>
				</div>
			</>
		);
	}
}
CompanyPg.propTypes = {
	getCompany: PropTypes.func.isRequired,
	company: PropTypes.object.isRequired,
	rooms: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
	company: state.company.company,
	rooms: state.room.rooms
});
export default connect(mapStateToProps, { getCompany, getAllRooms })(CompanyPg);
