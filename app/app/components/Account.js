import React from 'react';
import { connect } from 'react-redux';

class Account extends React.Component {
    render() {
        let confirmEmail = () => {
            if (!this.props.user.emailConfirmed) {
                return <p className="text-warning"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Confirm your email address.</p>;
            } else {
                return <p className="text-success"><i className="fa fa-check" aria-hidden="true"></i> Email confirmed.</p>;
            }
        };
        return (
            <div className="container text-center">
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