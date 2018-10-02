const React = require('react');
import { connect } from 'react-redux';

// Load actions
import { removeAlert } from '../actions/actions_alert';

class Alert extends React.Component {
    
    _removeAlert() {
        this.props.dispatch(removeAlert());
    }
    
    render() {
        if (this.props.alerts.type) {
            // set the header for the alert
            let alertHeader = "Oooops!";
            if (this.props.alerts.type === "email") {
                alertHeader = "Check your email.";
            } else if (this.props.alerts.type === "success") {
                alertHeader = "Success!";
            }
            // the colour of the alert
            let alertClass = "danger";
            if (this.props.alerts.type === "email") {
                alertClass = "info";
            } else if (this.props.alerts.type === "success") {
                alertClass = "success";
            }
            return (
                <div className={"alert alert-dismissible alert-" + alertClass }>
                  <button type="button" className="close" data-dismiss="alert" onClick={this._removeAlert.bind(this)}>&times;</button>
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