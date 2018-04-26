import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import { Grid } from 'semantic-ui-react';
import PasswordUpdate from 'pages/password-update/password-update';
import * as authService from 'auth/auth-service';
import 'pages/password-update/password-update-page.css';
import qs from 'qs';

class PasswordUpdatePage extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        location: PropTypes.shape({
            search: PropTypes.string.isRequired
        }).isRequired
    };

    componentDidMount() {
        this.token = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        }).token;

        if (!this.token) {
            this.props.history.push('/');
        }
    }

    submit = data => authService.passwordUpdate(this.token, data);

    success = () => {
        toast(
            {
                title: 'Password update successful',
                description: 'You can now login with your credentials'
            },
            () => this.props.history.push('/')
        );
    };

    render() {
        return (
            <Grid container centered verticalAlign="middle">
                <SemanticToastContainer />
                <Grid.Column computer={6} tablet={8} mobile={12}>
                    <PasswordUpdate
                        onSubmit={this.submit}
                        onSuccess={this.success}
                    >
                        Password Update
                    </PasswordUpdate>
                </Grid.Column>
            </Grid>
        );
    }
}

export default PasswordUpdatePage;
