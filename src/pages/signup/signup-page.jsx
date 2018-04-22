import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { signup } from 'auth/auth-thunks';
import SignUp from 'pages/signup/signup';
import 'pages/signup/signup-page.css';

class SignUpPage extends Component {
    static propTypes = {
        signup: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };

    submit = async data => {
        await this.props.signup(data);
        this.props.history.push('/');
    };

    render() {
        return (
            <Grid container centered verticalAlign="middle">
                <Grid.Column computer={6} tablet={8} mobile={12}>
                    <SignUp onSubmit={this.submit}>Sign Up Form</SignUp>
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(null, { signup })(SignUpPage);
