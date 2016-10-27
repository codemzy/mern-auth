var React = require('react');

// components
var Nav = require('./Nav.js');

var MainComponent = (props) => {
    return (
        <div>
            <Nav />
            <div className="container-fluid">
                {props.children}
            </div>
        </div>
    );
};


module.exports = MainComponent;