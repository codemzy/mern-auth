import React from 'react';
import { connect } from 'react-redux';

// components
import Alert from './Alert.js';
import LogOut from './LogOut.js';

// Load actions
import { requestEmailCode } from '../actions/actions_user';

class Account extends React.Component {
    
    _requestEmailConfirm(e) {
        e.preventDefault();
        this.props.dispatch(requestEmailCode());
    }
    
    render() {
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
                <Alert />
                <p>You are logged in as...</p>
                <h1>{this.props.user.email}</h1>
                {confirmEmail()}
                <LogOut />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        user: state.user
    };
})(Account);