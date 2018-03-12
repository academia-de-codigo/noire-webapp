import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from 'auth/auth-sagas';
import Login from './login';
import './login-page.css';

class LoginPage extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };

    submit = async data => {
        await this.props.login(data);
        this.props.history.push('/');
    };

    render() {
        return (
            <div className="login">
                <div className="ui centered grid container">
                    <div className="six wide computer eight wide tablet sixteen wide phone column">
                        <Login onSubmit={this.submit}>Login Page</Login>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { login })(LoginPage);
