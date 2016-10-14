import React from 'react';

// API
import { register } from '../api/user';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }
    
    _emailValid(email) {
        // basic email format check
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    _handleFormSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let confirm = this.refs.confirm.value;
        // check for errors
        const ERRORS = {};
        if (!email || !this._emailValid(email)) {
            ERRORS.email = "You need to enter a valid email address";
        }
        if (!password || password.length < 8) {
            ERRORS.password = "Enter a password of at least 8 characters";
        }
        if (email === password) {
            ERRORS.password = "You cannot use your email as your password";
        }
        if (password !== confirm) {
            ERRORS.confirm = "Your password confirmation does not match";
        }
        this.setState({
            errors: ERRORS
        });
        // if no errors then handle the form
        if (!ERRORS.email && !ERRORS.password && !ERRORS.confirm) {
            // clear form fields
            this.refs.email.value = '';
            this.refs.password.value = '';
            this.refs.confirm.value = '';
            // send the registration data
            register(email, password)
                .then((response) => {
                    console.log("success", response);
                }, (error) => {
                    console.log("Error logging in");
                });
        } 
    }
    
    render() {
        let emailError = this.state.errors.email ? <div className="has-error"><p className="help-block">{this.state.errors.email}</p></div> : false ;
        let passwordError = this.state.errors.password ? <div className="has-error"><p className="help-block">{this.state.errors.password}</p></div> : false ;
        let confirmError = this.state.errors.confirm ? <div className="has-error"><p className="help-block">{this.state.errors.confirm}</p></div> : false ;
        return (
            <div className="container">
                <div className="col-md-6 col-md-offset-3">
                    <h1 className="page-title">Register</h1>
                    <form onSubmit={this._handleFormSubmit.bind(this)}>
                        <div className="form-group">
                          <label className="control-label" htmlFor="email">Email</label>
                          <input className="form-control" id="email" type="text" ref="email" placeholder="you@youremail.com" required/>
                          {emailError}
                        </div>
                        <div className="form-group">
                          <label className="control-label" htmlFor="password">Password</label>
                          <input className="form-control" id="password" ref="password" type="password" required/>
                          {passwordError}
                        </div>
                        <div className="form-group">
                          <label className="control-label" htmlFor="confirm">Confirm Password</label>
                          <input className="form-control" id="confirm" ref="confirm" type="password" required/>
                          {confirmError}
                        </div>
                        <div className="form-group">
                            <br />
                            <input className="btn btn-default btn-block" type="submit" value="Log In" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

module.exports = Register;