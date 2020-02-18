import React, { Component } from "react";
import Navigation from "../layout/Navigation";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCompanies } from "../../actions/companyActions";

class AllCompanies extends Component {
	componentDidMount() {
		this.props.getCompanies();
	}
	render() {
		const { companies } = this.props;
		console.log(companies);
		return (
			<>
				<Navigation />
				<div className="allRoomsWrapper">
					<Container className="pt-4">
						<Row>
							<Col>
								{companies.map(company => {
									return (
										<Link to={`/escapeRm/${company._id}`} key={company._id}>
											<Card bg="dark" className="roomCard">
												<Card.Body
													style={{
														background: `url(${company.imageURL}) no-repeat bottom center/cover`,
														position: "relative"
													}}
												>
													<div className="overlay">
														<div className="innerText">
															<h2>{company.name}</h2>
															<p>{company.address}</p>
														</div>
													</div>
												</Card.Body>
											</Card>
										</Link>
									);
								})}
							</Col>
						</Row>
					</Container>
				</div>
			</>
		);
	}
}
AllCompanies.propTypes = {
	getCompanies: PropTypes.func.isRequired,
	companies: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
	companies: state.company.companies
});
export default connect(mapStateToProps, { getCompanies })(AllCompanies);
