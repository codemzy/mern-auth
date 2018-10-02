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
                <div className="col-md-6 col-md-offset-3">
                    <ul className="nav nav-tabs">
                      <li role="presentation">
                            <IndexLink to={basePath + "/login"} activeClassName="nav-active">Log In</IndexLink>
                      </li>
                      <li role="presentation">
                            <Link to={basePath + "/login/forgotten"} activeClassName="nav-active">Forgotten Password</Link>
                      </li>
                      <li role="presentation">
                            <Link to={basePath + "/register"} activeClassName="nav-active">Register</Link>
                      </li>
                    </ul>
                </div>
        );
    }
}

module.exports = Nav;