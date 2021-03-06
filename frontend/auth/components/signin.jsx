import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Signin extends Component {

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" className="input auth-input" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" type="password" component="input" className="input auth-input" />
        </fieldset>
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">Sign in</button>    
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

let signInForm = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin);

export default signInForm = connect(mapStateToProps, actions)(signInForm);

