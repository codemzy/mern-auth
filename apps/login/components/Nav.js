var React = require('react');
var {Link, IndexLink} = require('react-router');

import { basePath } from '../config/router';

// components
import Wrap from './Wrap.js';

class Nav extends React.Component {
    
    _linkToIndex(e) {
        e.preventDefault();
        window.location = window.location.protocol + "//" + window.location.host + "/";
    }
    
    render() {
        return (
                <Wrap>
                    <ul className="nav nav-tabs mb-5">
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
                </Wrap>
        );
    }
}

module.exports = Nav;