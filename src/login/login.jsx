import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'Validator';
import { Message, Segment, Header, Form, Button } from 'semantic-ui-react';
import InputField from 'core/forms/input-field';
import CheckBoxField from 'core/forms/checkbox-field';

function Login(props) {
    return (
        <div className="ui container">
            <Segment raised>
                <Header textAlign="center" size="large" as="h1">
                    {props.children}
                </Header>
                <LoginForm onSubmit={props.onSubmit} />
            </Segment>
        </div>
    );
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node
};

Login.defaultProps = {
    children: 'Login Form'
};

export class LoginForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    static validate(data) {
        const rules = {
            username: 'required|min:3',
            password: 'required|min:3'
        };

        const validator = Validator.make(data, rules);
        const errors = {};

        if (validator.fails()) {
            Object.keys(validator.getErrors()).forEach(key => {
                // do not generate errors for pristine fields
                if (data.hasOwnProperty(key)) {
                    [errors[key]] = validator.getErrors()[key];
                }
            });
        }

        return errors;
    }

    state = {
        data: {},
        error: null,
        passwordVisible: false
    };

    onChange = event => {
        this.setState({
            data: {
                ...this.state.data,
                [event.currentTarget.name]: event.currentTarget.value
            }
        });
    };

    onShowPassword = () => {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        });
    };

    onSubmit = async () => {
        if (this.canSubmit()) {
            try {
                await this.props.onSubmit(this.state.data);
            } catch (error) {
                this.setState({
                    error: error.message
                });
            }
        }
    };

    canSubmit() {
        const { data } = this.state;
        const errors = LoginForm.validate(data);

        return Object.keys(errors).length === 0;
    }

    render() {
        const { data, passwordVisible } = this.state;
        const errorMessage = this.state.error;
        const errors = LoginForm.validate(data);

        return (
            <Form size="large" onSubmit={this.onSubmit}>
                <InputField
                    name="username"
                    icon="user"
                    placeholder="username"
                    value={data.username}
                    onChange={this.onChange}
                    error={errors.username}
                />

                <InputField
                    name="password"
                    icon="lock"
                    placeholder="password"
                    password={!passwordVisible}
                    value={data.password}
                    onChange={this.onChange}
                    error={errors.password}
                />

                <CheckBoxField
                    text="Show Password"
                    onChange={this.onShowPassword}
                />

                <Button disabled={!this.canSubmit()} primary fluid size="large">
                    Login
                </Button>
                {errorMessage && <Message negative>{errorMessage}</Message>}
            </Form>
        );
    }
}

export default Login;
