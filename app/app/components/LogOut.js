import React from 'react';
import { connect } from 'react-redux';

// Load actions
import { logOutUser } from '../actions/actions_user';

class LogOut extends React.Component {
    
    _handleLogOut(e) {
        e.preventDefault();
        this.props.dispatch(logOutUser())
            .then((response) => {
                window.location.reload();
            });
    }
    
    render() {
        return (
            <div className="well">
                <h3>Done what you came for?</h3>
                <button className="btn btn-default btn-lg" onClick={this._handleLogOut.bind(this)}><i className="fa fa-sign-out"></i> Log Out</button>
            </div>
        );
    }
}

LogOut.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect()(LogOut);