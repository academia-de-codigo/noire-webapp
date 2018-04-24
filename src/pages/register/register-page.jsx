import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Register from 'pages/register/register';
import * as authService from 'auth/auth-service';
import 'pages/register/register-page.css';
import qs from 'qs';

class RegisterPage extends Component {
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

    submit = async data => {
        await authService.register(this.token, data);
    };

    render() {
        return (
            <Grid container centered verticalAlign="middle">
                <Grid.Column computer={6} tablet={8} mobile={12}>
                    <Register onSubmit={this.submit}>
                        Registration Form
                    </Register>
                </Grid.Column>
            </Grid>
        );
    }
}

export default RegisterPage;
