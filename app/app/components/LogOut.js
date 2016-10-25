import React from 'react';

const LogOut = (props) => {
    return (
        <div className="well">
            <h3>Done what you came for?</h3>
            <button className="btn btn-default btn-lg" onClick={props.onLogOut}><i className="fa fa-sign-out"></i> Log Out</button>
        </div>
    );
};


export default LogOut;