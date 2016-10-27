var React = require('react');
var {Link, IndexLink} = require('react-router');

class Nav extends React.Component {
    
    _linkToIndex(e) {
        e.preventDefault();
        window.location = window.location.protocol + "//" + window.location.hostname + "/";
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="col-md-6 col-md-offset-3">
                    <ul className="nav nav-tabs">
                      <li role="presentation">
                            <IndexLink to="/login" activeClassName="nav-active">Log In</IndexLink>
                      </li>
                      <li role="presentation">
                            <Link to="/login/forgotten" activeClassName="nav-active">Forgotten Password</Link>
                      </li>
                      <li role="presentation">
                            <Link to="/login/register" activeClassName="nav-active">Register</Link>
                      </li>
                    </ul>
                </div>
            </div>
        );
    }
}

module.exports = Nav;