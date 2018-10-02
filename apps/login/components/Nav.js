var React = require('react');
var {Link, IndexLink} = require('react-router');

import { basePath } from '../config/router';

class Nav extends React.Component {
    
    _linkToIndex(e) {
        e.preventDefault();
        window.location = window.location.protocol + "//" + window.location.host + "/";
    }
    
    render() {
        return (
                <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                            <IndexLink to={basePath + "/login"} className="nav-link" activeClassName="active">Log In</IndexLink>
                      </li>
                      <li className="nav-item">
                            <Link to={basePath + "/login/forgotten"} className="nav-link" activeClassName="active">Forgotten</Link>
                      </li>
                      <li className="nav-item">
                            <Link to={basePath + "/register"} className="nav-link" activeClassName="active">Register</Link>
                      </li>
                    </ul>
                </div>
        );
    }
}

module.exports = Nav;