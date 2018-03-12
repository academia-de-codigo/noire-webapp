import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const HomePage = ({ auth }) => (
    <div className="ui container">
        <h1>Home Page</h1>
        {auth ? <span>Logout</span> : <Link to="/login">Login</Link>}
    </div>
);

HomePage.propTypes = {
    auth: PropTypes.bool.isRequired
};

function mapStateToProps({ auth }) {
    return {
        auth: !!auth.token
    };
}

export default connect(mapStateToProps)(HomePage);
