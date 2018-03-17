import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ isAuthenticated, component, ...rest }) {
    return isAuthenticated ? (
        <Route component={component} {...rest} />
    ) : (
        <Redirect to="/login" />
    );
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};

function mapStateToProps({ auth }) {
    return {
        isAuthenticated: !!auth.token
    };
}

export default connect(mapStateToProps, null)(PrivateRoute);
