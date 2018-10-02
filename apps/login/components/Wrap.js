const React = require('react');

export default (props) => {
    return (
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 pt-2">
            { props.children }
        </div>
    );
};