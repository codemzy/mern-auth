import React from 'react';
import { connect } from 'react-redux';

class Account extends React.Component {
    render() {
        return (
            <div className="container text-center">
                <h1>{this.props.user.email}</h1>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        user: state.user
    };
})(Account);