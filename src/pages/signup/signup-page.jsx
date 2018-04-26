import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import { Grid } from 'semantic-ui-react';
import * as authService from 'auth/auth-service';
import SignUp from 'pages/signup/signup';
import 'pages/signup/signup-page.css';

class SignUpPage extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };

    submit = ({ email }) => authService.signup(email);

    success = () => {
        toast(
            {
                title: 'User Sign Up successful',
                description:
                    'A registration email has been sent, please check your inbox'
            },
            () => this.props.history.push('/')
        );
    };

    render() {
        return (
            <Grid container centered verticalAlign="middle">
                <SemanticToastContainer />
                <Grid.Column computer={6} tablet={8} mobile={12}>
                    <SignUp onSubmit={this.submit} onSuccess={this.success}>
                        Sign Up Form
                    </SignUp>
                </Grid.Column>
            </Grid>
        );
    }
}

export default SignUpPage;
