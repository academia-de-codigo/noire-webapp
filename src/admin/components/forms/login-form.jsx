import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'Validator';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import InputField from 'core/components/forms/input-field';
import CheckBoxField from 'core/components/forms/checkbox-field';

function LoginFormContainer(props) {
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

LoginFormContainer.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node
};

LoginFormContainer.defaultProps = {
    children: PropTypes.node
};

class LoginForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    static validate(data) {
        const rules = {
            username: 'required|min:3',
            password: 'required|min:6'
        };

        const validator = Validator.make(data, rules);
        const errors = {};

        if (validator.fails()) {
            Object.keys(validator.getErrors()).forEach(key => {
                [errors[key]] = validator.getErrors()[key];
            });
        }

        return errors;
    }

    state = {
        data: {},
        errors: {},
        passwordVisible: false
    };

    onChange = event => {
        const data = {
            ...this.state.data,
            [event.currentTarget.name]: event.currentTarget.value
        };

        this.setState({
            data,
            errors: LoginForm.validate(data)
        });
    };

    onShowPassword = () => {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        });
    };

    onSubmit = () => {
        if (this.canSubmit()) {
            this.props.onSubmit(this.state.data);
        }
    };

    canSubmit() {
        const { data, errors } = this.state;
        return (
            Object.keys(errors).length === 0 &&
            Object.keys(data).every(key => data[key])
        );
    }

    hasError(field) {
        const { errors, data } = this.state;
        return !!errors[field] && data.hasOwnProperty(field);
    }

    render() {
        const { data, errors, passwordVisible } = this.state;

        return (
            <Form size="large" onSubmit={this.onSubmit}>
                <InputField
                    name="username"
                    icon="user"
                    placeholder="username"
                    value={data.username}
                    onChange={this.onChange}
                    error={this.hasError('username') ? errors.username : null}
                />

                <InputField
                    name="password"
                    icon="lock"
                    placeholder="password"
                    password={!passwordVisible}
                    value={data.password}
                    onChange={this.onChange}
                    error={this.hasError('password') ? errors.password : null}
                />

                <CheckBoxField
                    text="Show Password"
                    onChange={this.onShowPassword}
                />

                <Button disabled={!this.canSubmit()} primary fluid size="large">
                    Login
                </Button>
            </Form>
        );
    }
}

export default LoginFormContainer;
