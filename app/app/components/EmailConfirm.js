import React from 'react';
import { connect } from 'react-redux';

// Load actions
import { confirmEmailCode } from '../actions/actions_user';
import { addAlert, removeAlert } from '../actions/actions_alert';

class EmailConfirm extends React.Component {
    
    componentDidUpdate() {
        if (this.props.user.email && this.props.user.emailConfirmed) {
            // if the email is already confirmed
            this.props.dispatch(addAlert("Your email is confirmed. Thank you.", "success"));
            this.context.router.push('/app/account');
        } else if (this.props.user.email) {
            const ECC = this.props.routeParams.emailCode;
            this.props.dispatch(confirmEmailCode(ECC))
                .then((success) => {
                    this.props.dispatch(removeAlert());
                    this.context.router.push('/app/account');
                }, (error) => {
                    this.props.dispatch(addAlert("Email confirmation code invalid, try again.", "error"));
                    this.context.router.push('/app/account');
                });
        }
    }
    
    render() {
        return (
            <div className="container text-center">
                <h1><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></h1>
                <h1>Confirming Your Email...</h1>
            </div>
        );
    }
}

EmailConfirm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect((state) => {
    return {
        user: state.user
    };
})(EmailConfirm);