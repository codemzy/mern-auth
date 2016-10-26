const React = require('react');

const Loading = (props) => {
    let message = props.message || "Loading";
    return (
        <div className="container text-center">
            <h1><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></h1>
            <h2>{message}...</h2>
        </div>
    );
};


export default Loading;