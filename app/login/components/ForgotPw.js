var React = require('react');

// API
import { forgotPassword } from '../api/user';

// components
import Loading from './Loading.js';

class ForgotPw extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            alertMessage: false,
            loading: false
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
        // check for errors
        const ERRORS = {};
        if (!email || !this._emailValid(email)) {
            ERRORS.email = "You need to enter a valid email address";
        }
        this.setState({
            errors: ERRORS
        });
        // if no errors then handle the form
        if (!ERRORS.email) {
            this.setState({ loading: true });
            // clear form fields
            this.refs.email.value = '';
            // send the email to forgot password
            forgotPassword(email)
                .then((response) => {
                    console.log("success", response);
                    this.setState({
                        alertMessage: "We have emailed you instructions to reset your password, please check your email.",
                        loading: false
                    });
                });
        } 
    }
    
    render() {
        if (this.state.loading) {
            return <Loading message="Requesting a new password" />;
        }
        let emailError = this.state.errors.email ? <div className="has-error"><p className="help-block">{this.state.errors.email}</p></div> : false ;
        let alertMessage = this.state.alertMessage ? <div className="alert alert-dismissible alert-info">{this.state.alertMessage}</div>: false ;
        return (
            <div className="col-md-6 col-md-offset-3">
                {alertMessage}
                <h1>Forgotten Password</h1>
                <p>No worries. You can get access to your account by resetting your password via email. Enter the email address for your account below and we will send you instructions.</p>
                <form onSubmit={this._handleFormSubmit.bind(this)}>
                    <div className="form-group">
                      <label className="control-label" htmlFor="email">Email</label>
                      <input className="form-control" id="email" type="text" ref="email" placeholder="you@youremail.com" required/>
                      {emailError}
                    </div>
                    <div className="form-group">
                        <br />
                        <input className="btn btn-default btn-block" type="submit" value="New Password" />
                    </div>
                </form>
            </div>
        );
    }
}

module.exports = ForgotPw;