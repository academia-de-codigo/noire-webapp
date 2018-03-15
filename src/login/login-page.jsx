import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
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
            <Grid container centered verticalAlign="middle">
                <Grid.Column computer={6} tablet={8} mobile={12}>
                    <Login onSubmit={this.submit}>Login Page</Login>
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(null, { login })(LoginPage);
