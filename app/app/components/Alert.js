const React = require('react');
import { connect } from 'react-redux';

class Alert extends React.Component {
    render() {
        if (this.props.alerts.type) {
            // set the header for the alert
            let alertHeader = "Oooops!";
            if (this.props.alerts.type === "email") {
                alertHeader = "Check your email.";
            }
            // the colour of the alert
            let alertClass = "danger";
            if (this.props.alerts.type === "email") {
                alertClass = "info";
            }
            return (
                <div className={"alert alert-dismissible alert-" + alertClass }>
                  <button type="button" className="close" data-dismiss="alert">&times;</button>
                  <strong>{alertHeader}</strong> {this.props.alerts.message}
                </div>
            );
        } else {
            return false;
        }
    }
}


export default connect((state) => {
    return {
        alerts: state.alerts
    };
})(Alert);