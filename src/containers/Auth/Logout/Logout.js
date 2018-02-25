import React , { Component } from 'react';
import * as actions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Logout extends Component {

    componentWillMount() {
        this.props.onLogout()
    }
    render() {
        return (
            <Redirect to='/'/>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logOut())
    }
}

export default connect(null,mapDispatchToProps)(Logout)