import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import { Grid } from 'semantic-ui-react';
import * as authService from 'auth/auth-service';
import PasswordReset from 'pages/password-reset/password-reset';
import 'pages/password-reset/password-reset-page.css';

class PasswordResetPage extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };

    submit = ({ email }) => authService.passwordReset(email);

    success = () => {
        toast(
            {
                title: 'Password Reset',
                description:
                    'A registration email has been sent, please check your inbox',
                time: 5000
            },
            () => this.props.history.push('/')
        );
    };

    render() {
        return (
            <Grid container centered verticalAlign="middle">
                <SemanticToastContainer />
                <Grid.Column computer={6} tablet={8} mobile={12}>
                    <PasswordReset
                        onSubmit={this.submit}
                        onSuccess={this.success}
                        header="Password Reset"
                    >
                        Enter your email address and we will send you a link to
                        reset your password
                    </PasswordReset>
                </Grid.Column>
            </Grid>
        );
    }
}

export default PasswordResetPage;
