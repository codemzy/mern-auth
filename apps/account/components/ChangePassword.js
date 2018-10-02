import React from 'react';
import { connect } from 'react-redux';

// components
import Loading from './Loading.js';

// Load actions
import { changePassword } from '../actions/actions_user';
import { addAlert } from '../actions/actions_alert';

class ChangePw extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            loading: false
        };
    }
    
    _handleFormSubmit(e) {
        e.preventDefault();
        let oldPassword = this.refs.oldPassword.value;
        let newPassword = this.refs.newPassword.value;
        let confirm = this.refs.confirm.value;
        // check for errors in form
        const ERRORS = {};
        if (!oldPassword || oldPassword.length < 8) {
            ERRORS.oldPassword = "Existing password supplied too short.";
        }
        if (!newPassword || newPassword.length < 8) {
            ERRORS.newPassword = "Enter a new password of at least 8 characters";
        }
        if (this.props.email === newPassword) {
            ERRORS.newPassword = "You cannot use your email as your password";
        }
        if (newPassword !== confirm) {
            ERRORS.confirm = "Your password confirmation does not match";
        }
        this.setState({
            errors: ERRORS
        });
        // if no errors then handle the form
        if (!ERRORS.oldPassword && !ERRORS.newPassword && !ERRORS.confirm) {
            this.setState({ loading: true });
            // clear form fields
            this.refs.oldPassword.value = '';
            this.refs.newPassword.value = '';
            this.refs.confirm.value = '';
            // send the reset pw data
            changePassword(oldPassword, newPassword)
                .then((response) => {
                    this.setState({ loading: false });
                    this.props.dispatch(addAlert("Your password has been changed.", "success"));
                }, (error) => {
                    this.props.dispatch(addAlert("Your password could not be updated. " + error, "error"));
                    this.setState({ loading: false });
                });
        } 
    }
    
    render() {
        // if loading response show loading screen
        if (this.state.loading) {
            return <Loading message="Changing your password" />;
        }
        // otherwise show the form
        let oldPasswordError = this.state.errors.oldPassword ? <div className="has-error"><p className="help-block">{this.state.errors.oldPassword}</p></div> : false ;
        let newPasswordError = this.state.errors.newPassword ? <div className="has-error"><p className="help-block">{this.state.errors.newPassword}</p></div> : false ;
        let confirmError = this.state.errors.confirm ? <div className="has-error"><p className="help-block">{this.state.errors.confirm}</p></div> : false ;
        return (
            <div className="panel panel-default text-left">
                <div className="panel-heading">
                    <h3 className="panel-title">Change password</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this._handleFormSubmit.bind(this)}>
                        <div className="form-group">
                          <label className="control-label" htmlFor="oldPassword">Current Password</label>
                          <input className="form-control" id="oldPassword" ref="oldPassword" type="password" required/>
                          {oldPasswordError}
                        </div>
                        <div className="form-group">
                          <label className="control-label" htmlFor="password">New Password</label>
                          <input className="form-control" id="password" ref="newPassword" type="password" required/>
                          {newPasswordError}
                        </div>
                        <div className="form-group">
                          <label className="control-label" htmlFor="confirm">Confirm New Password</label>
                          <input className="form-control" id="confirm" ref="confirm" type="password" required/>
                          {confirmError}
                        </div>
                        <div className="form-group text-center">
                            <input className="btn btn-primary" type="submit" value="Change Password" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(ChangePw);