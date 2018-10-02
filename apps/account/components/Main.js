const React = require('react');

// components
import Nav from './Nav.js';

const MainComponent = (props) => {
    return (
        <div>
            <Nav />
            {props.children}
        </div>
    );
};


export default MainComponent;