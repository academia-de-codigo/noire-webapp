import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Checkbox } from 'semantic-ui-react';
import InlineError from 'core/components/messages/inline-error';

class LoginForm extends Component {
    static propTypes = {
        submit: PropTypes.func.isRequired
    };

    static validate(data) {
        const errors = {};

        if (!data.username) {
            errors.username = 'Username can not be blank';
        } else if (data.username.length < 3) {
            errors.username = 'Username requires at least 3 characters';
        }

        if (!data.password) {
            errors.password = 'Password can not be blank';
        } else if (data.password.length < 6) {
            errors.password = 'Password requires at least 6 characters';
        }

        return errors;
    }

    state = {
        data: {
            username: '',
            password: ''
        },
        pristine: {
            username: true,
            password: true
        },
        errors: {},
        passwordVisible: false
        // loading: false,
    };

    onChange = event => {
        const data = {
            ...this.state.data,
            [event.currentTarget.name]: event.currentTarget.value
        };

        const pristine = {
            ...this.state.pristine,
            [event.currentTarget.name]: false
        };

        this.setState({
            data,
            pristine,
            errors: LoginForm.validate(data)
        });
    };

    onShowPassword = () => {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        });
    };

    onSubmit = () => {
        if (!this.hasErrors()) {
            this.props.submit(this.state.data);
        }
    };

    hasErrors() {
        return (
            Object.keys(this.state.errors).length !== 0 ||
            !Object.keys(this.state.pristine).every(
                value => !this.state.pristine[value]
            )
        );
    }

    render() {
        const { data, pristine, errors } = this.state;

        return (
            <Form size="large" onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.username && !pristine.username}>
                    <Input
                        name="username"
                        icon="user"
                        iconPosition="left"
                        placeholder="username"
                        value={data.username}
                        onChange={this.onChange}
                    />
                    {errors.username &&
                        !pristine.username && (
                            <InlineError text={errors.username} />
                        )}
                </Form.Field>

                <Form.Field error={!!errors.password && !pristine.password}>
                    <Input
                        name="password"
                        icon="lock"
                        iconPosition="left"
                        type={this.state.passwordVisible ? 'text' : 'password'}
                        placeholder="password"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password &&
                        !pristine.password && (
                            <InlineError text={errors.password} />
                        )}
                </Form.Field>

                <Form.Field>
                    <Checkbox
                        toggle
                        label="Show Password"
                        onChange={this.onShowPassword}
                    />
                </Form.Field>

                <Button disabled={this.hasErrors()} primary fluid size="large">
                    Login
                </Button>
            </Form>
        );
    }
}

export default LoginForm;
