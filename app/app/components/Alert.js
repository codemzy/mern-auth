const React = require('react');
import { connect } from 'react-redux';

class Alert extends React.Component {
    render() {
        if (this.props.alerts) {
            return (
                <div className={"alert alert-dismissible alert-" + this.props.alerts.type }>
                  <button type="button" className="close" data-dismiss="alert">&times;</button>
                  <strong>{this.props.alerts.title}</strong>{this.props.alerts.message}
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