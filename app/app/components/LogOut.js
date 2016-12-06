import React from 'react';
import { connect } from 'react-redux';

// Load actions
import { logOutUser } from '../actions/actions_user';

// components
import Loading from './Loading.js';

class LogOut extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false
        };
    }
    
    _handleLogOut(e) {
        e.preventDefault();
        this.setState({ loading: true });
        this.props.dispatch(logOutUser())
            .then((response) => {
                window.location = window.location.protocol + "//" + window.location.host + "/";
            });
    }
    
    render() {
        if (this.state.loading) {
            return <div className="well"><Loading message="Logging out" /></div>;
        }
        return (
            <div className="panel panel-default text-left">
                <div className="panel-heading">
                    <h3 className="panel-title">Log out</h3>
                </div>
                <div className="panel-body text-center">
                    <button className="btn btn-danger" onClick={this._handleLogOut.bind(this)}><i className="fa fa-sign-out"></i> Log Out</button>
                </div>
            </div>
        );
    }
}

export default connect()(LogOut);