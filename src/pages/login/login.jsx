import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Validator from 'Validator';
import { Message, Segment, Header, Form, Button } from 'semantic-ui-react';
import InputField from 'core/forms/input-field';
import CheckBoxField from 'core/forms/checkbox-field';

function Login(props) {
    return (
        <Segment raised>
            <Header textAlign="center" size="large">
                {props.children}
            </Header>
            <LoginForm onSubmit={props.onSubmit} />
        </Segment>
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
        loading: false,
        globalError: null,
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
        if (!this.canSubmit()) {
            return;
        }

        try {
            this.setState({ loading: true });
            await this.props.onSubmit(this.state.data);
        } catch (error) {
            this.setState({
                globalError: error.message,
                loading: false
            });
        }
    };

    canSubmit() {
        const { data } = this.state;
        const errors = LoginForm.validate(data);

        return (
            Object.keys(errors).length === 0 && data.username && data.password
        );
    }

    render() {
        const { data, passwordVisible, loading, globalError } = this.state;
        const errors = LoginForm.validate(data);

        return (
            <Form size="large" onSubmit={this.onSubmit} loading={loading}>
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

                {globalError && (
                    <Message negative>
                        <Message.Header>Login Failure</Message.Header>
                        <p>{globalError}</p>
                    </Message>
                )}
                <div className="login">
                    <Link to="/password-reset">Forgot your Password?</Link>
                </div>
            </Form>
        );
    }
}

export default Login;
