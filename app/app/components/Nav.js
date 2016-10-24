const React = require('react');
const {Link, IndexLink} = require('react-router');

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
                      <IndexLink to="/app" className="navbar-brand" activeClassName="active">App</IndexLink>
                    </div>
                    
                    <div className="collapse navbar-collapse" id="menu-collapse">
                    
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/app/about" activeClassName="active">About</Link>
                            </li>
                        </ul>
                        
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/app/account" activeClassName="active">Account</Link>
                            </li>
                        </ul>
                    
                    </div>
                
                </div>
            </nav>
        );
    }
}

export default Nav;