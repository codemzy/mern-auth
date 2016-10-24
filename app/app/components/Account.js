import React from 'react';
import { connect } from 'react-redux';

// Load actions
import { requestEmailCode } from '../actions/actions_user';

class Account extends React.Component {
    
    _requestEmailConfirm(e) {
        e.preventDefault();
        this.props.dispatch(requestEmailCode());
    }
    
    render() {
        let message = () => {
            if (this.props.user.ecc) {
                return <div className="alert alert-info"><strong>Check your email.</strong> We have sent you an email confirm code, click the link to confirm your email address.</div>;
            }
        };
        let confirmEmail = () => {
            if (!this.props.user.emailConfirmed) {
                return (
                    <div>
                        <p className="text-warning"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Confirm your email address.</p>
                        <p><a href="#" onClick={this._requestEmailConfirm.bind(this)}>Request confirm email code.</a></p>
                    </div>
                );
            } else {
                return <p className="text-success"><i className="fa fa-check" aria-hidden="true"></i> Email confirmed.</p>;
            }
        };
        return (
            <div className="container text-center">
                {message()}
                <p>You are logged in as...</p>
                <h1>{this.props.user.email}</h1>
                {confirmEmail()}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        user: state.user
    };
})(Account);