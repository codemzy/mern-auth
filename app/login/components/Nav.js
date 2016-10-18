var React = require('react');
var {Link, IndexLink} = require('react-router');

class Nav extends React.Component {
    
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="col-md-10 col-md-offset-1">

                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu-collapse" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <IndexLink to="/" className="navbar-brand" activeClassName="active">My App</IndexLink>
                    </div>
                    
                    <div className="collapse navbar-collapse" id="menu-collapse">
                    
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/login" activeClassName="active">Log In</Link>
                            </li>
                            <li>
                                <Link to="/login/forgotten" activeClassName="active">Forgotten Password</Link>
                            </li>
                            <li>
                                <Link to="/login/register" activeClassName="active">Register</Link>
                            </li>
                        </ul>
                    
                    </div>
                
                </div>
            </nav>
        );
    }
}

module.exports = Nav;