import React from 'react';
import { connect } from 'react-redux';

class Account extends React.Component {
    
}

export default connect((state) => {
    return {
        user: state.user
    };
})(Account);