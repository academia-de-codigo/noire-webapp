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

        if (!data.password) {
            errors.password = 'Username can not be blank';
        }

        if (!data.username) {
            errors.username = 'Password can not be blank';
        }

        return errors;
    }

    state = {
        data: {
            username: '',
            password: ''
        },
        // loading: false,
        errors: {}
    };

    onChange = event => {
        this.setState({
            data: {
                ...this.state.data,
                [event.currentTarget.name]: event.currentTarget.value
            }
        });
    };

    onSubmit = () => {
        const errors = LoginForm.validate(this.state.data);
        this.setState({ errors });

        // pass on form data if no errors
        if (!Object.keys(errors).length) {
            this.props.submit(this.state.data);
        }
    };

    render() {
        const { data, errors } = this.state;
        return (
            <Form size="large" onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.username}>
                    <Input
                        name="username"
                        icon="user"
                        iconPosition="left"
                        placeholder="username"
                        value={data.username}
                        onChange={this.onChange}
                    />
                    {errors.username && <InlineError text={errors.username} />}
                </Form.Field>

                <Form.Field error={!!errors.password}>
                    <Input
                        name="password"
                        icon="lock"
                        iconPosition="left"
                        type="password"
                        placeholder="password"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>

                <Form.Field>
                    <Checkbox toggle label="Show Password" />
                </Form.Field>

                <Button primary fluid size="large">
                    Login
                </Button>
            </Form>
        );
    }
}

export default LoginForm;
