import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteCompany} from '../../../actions/companyActions';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';


class DeleteCompany extends Component {
  onDeleteClick = (id) => {
    if(window.confirm('Are you sure you want to delete this?'))
    {
      this.props.deleteCompany(id)
      .then(window.location.reload())
    }
  };
  render() {
    const {id} = this.props;
    return (
      <div>
         <Button variant="danger" onClick={this.onDeleteClick.bind(this,id)}>Delete</Button>
      </div>
    )
  }
}

DeleteCompany.propTypes={
  deleteCompany:PropTypes.func.isRequired
}
export default connect(null,{deleteCompany})(DeleteCompany);