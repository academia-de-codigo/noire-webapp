import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputField from 'core/forms/input-field';
import FormBehaviour from 'core/forms/form-behaviour';
import { Segment, Header, Form, Button, Message } from 'semantic-ui-react';
import CheckBoxField from 'core/forms/checkbox-field';

function Register(props) {
    const rules = {
        name: 'required|min:6|max:64',
        email: 'required|email',
        username: 'required|min:3|max:32',
        password: 'required|min:3|max:32'
    };

    return (
        <Segment raised>
            <Header textAlign="center" size="large">
                {props.children}
            </Header>
            <FormBehaviour
                onSubmit={props.onSubmit}
                rules={rules}
                render={(formProps, handlers) => (
                    <RegisterForm {...formProps} {...handlers} />
                )}
            />
        </Segment>
    );
}

Register.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node
};

Register.defaultProps = {
    children: 'Registration Form'
};

export class RegisterForm extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        data: PropTypes.objectOf(PropTypes.string).isRequired,
        errors: PropTypes.objectOf(PropTypes.string).isRequired,
        loading: PropTypes.bool.isRequired,
        canSubmit: PropTypes.bool.isRequired,
        globalError: PropTypes.string
    };

    static defaultProps = {
        globalError: null
    };

    state = {
        passwordVisible: false,
        errors: {}
    };

    onShowPassword = () => {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        });

        this.props.onChange();
    };

    onChange = async event => {
        await this.props.onChange(event);

        const { data } = this.props;
        if (!data['password-confirm']) {
            return;
        }

        this.setState({
            errors:
                data.password !== data['password-confirm']
                    ? { 'password-confirm': 'passwords do not match' }
                    : {}
        });
    };

    render() {
        const { data, loading, canSubmit } = this.props;
        const { errors, globalError } = this.props;
        const { onChange, onSubmit } = this.props;
        const { passwordVisible } = this.state;

        return (
            <Form size="large" onSubmit={onSubmit} loading={loading}>
                <InputField
                    name="name"
                    icon="address card"
                    placeholder="full name"
                    value={data.name}
                    onChange={onChange}
                    error={errors.name}
                />

                <InputField
                    name="email"
                    icon="envelope"
                    placeholder="email"
                    value={data.email}
                    onChange={onChange}
                    error={errors.email}
                />

                <InputField
                    name="username"
                    icon="user"
                    placeholder="username"
                    value={data.username}
                    onChange={onChange}
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

                <InputField
                    name="password-confirm"
                    icon="lock"
                    placeholder="password"
                    password={!passwordVisible}
                    value={data['password-confirm']}
                    onChange={this.onChange}
                    error={this.state.errors['password-confirm']}
                />

                <CheckBoxField
                    text="Show Password"
                    onChange={this.onShowPassword}
                />

                <Button disabled={!canSubmit} primary fluid size="large">
                    Login
                </Button>

                {globalError && (
                    <Message negative>
                        <Message.Header>Login Failure</Message.Header>
                        <p>{globalError}</p>
                    </Message>
                )}
            </Form>
        );
    }
}

export default Register;
