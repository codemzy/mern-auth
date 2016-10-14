import React from 'react';
import { Link } from 'react-router';

// API
import { logIn } from '../api/logIn';

class LogIn extends React.Component {
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
        // handle the form
        if (this._emailValid(email) && password.length > 5) {
            this.refs.email.value = '';
            this.refs.password.value = '';
            // send the log in data
            logIn(email, password)
                .then((response) => {
                    console.log("success", response);
                }, (error) => {
                    console.log("Error logging in");
                });
        } else {
            // check for errors
            const ERRORS = {};
            if (!email || !this._emailValid(email)) {
                ERRORS.email = "You need to enter a valid email address";
            }
            if (!password || password.length < 8) {
                ERRORS.password = "Enter a password of at least 8 characters";
            }
            this.setState({
                errors: ERRORS
            });
        }
    }
    
    render() {
        let emailError = this.state.errors.email ? <div className="has-error"><p className="help-block">{this.state.errors.email}</p></div> : false ;
        let passwordError = this.state.errors.password ? <div className="has-error"><p className="help-block">{this.state.errors.password}</p></div> : false ;
        return (
            <div className="container">
            <div className="col-md-6 col-md-offset-3">
                <h1 className="page-title">Log In</h1>
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
                        <br />
                        <input className="btn btn-yellow btn-block" type="submit" value="Log In" />
                    </div>
                </form>
                <p><small><Link to="/login/forgotten" activeClassName="active">Forgot your password?</Link></small></p>
                </div>
            </div>
        );
    }
}

module.exports = LogIn;