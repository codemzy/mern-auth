var React = require('react');

// components
var Nav = require('./Nav.js');

var MainComponent = (props) => {
    return (
        <div>
            <Nav />
            {props.children}
        </div>
    );
};


module.exports = MainComponent;