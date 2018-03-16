import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ auth, component, ...rest }) {
    if (!auth.token) {
        return <Redirect to="/login" />;
    }

    return <Route component={component} {...rest} />;
}

PrivateRoute.propTypes = {
    auth: PropTypes.shape({
        token: PropTypes.string
    }).isRequired,
    component: PropTypes.func.isRequired
};

function mapStateToProps({ auth }) {
    return {
        auth
    };
}

export default connect(mapStateToProps, null)(PrivateRoute);
