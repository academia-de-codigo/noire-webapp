// @flow
import React, { Component } from 'react';
import { Form, Button, Input, Checkbox } from 'semantic-ui-react';
import InlineError from 'core/components/messages/inline-error';

type Data = {
    username?: string,
    password?: string
};

type Errors = {
    username?: string,
    password?: string
};

type State = {
    data: Data,
    errors: Errors
};

type Props = {
    submit: Data => void
};

class LoginForm extends Component<Props, State> {
    static validate(data: Data) {
        const errors: Errors = {};

        if (!data.password) {
            errors.password = 'Username can not be blank';
        }

        if (!data.username) {
            errors.username = 'Password can not be blank';
        }

        return errors;
    }

    state: State = {
        data: {
            username: '',
            password: ''
        },
        // loading: false,
        errors: {}
    };

    onChange = (event: Event) => {
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
