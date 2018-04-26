import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputField from 'core/forms/input-field';
import FormBehaviour from 'core/forms/form-behaviour';
import { Segment, Header, Form, Button, Message } from 'semantic-ui-react';
import CheckBoxField from 'core/forms/checkbox-field';

function PasswordUpdate(props) {
    const rules = {
        email: 'required|email',
        password: 'required|min:3|max:32'
    };

    return (
        <Segment raised>
            <Header textAlign="center" size="large">
                {props.children}
            </Header>
            <FormBehaviour
                {...props}
                rules={rules}
                render={(formProps, handlers) => (
                    <PasswordUpdateForm {...formProps} {...handlers} />
                )}
            />
        </Segment>
    );
}

PasswordUpdate.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node
};

PasswordUpdate.defaultProps = {
    children: 'Registration Form'
};

export class PasswordUpdateForm extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        data: PropTypes.objectOf(PropTypes.string).isRequired,
        errors: PropTypes.objectOf(PropTypes.string).isRequired,
        loading: PropTypes.bool.isRequired,
        disabled: PropTypes.bool.isRequired,
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
        const { data, loading, disabled, canSubmit } = this.props;
        const { errors, globalError } = this.props;
        const { onChange, onSubmit } = this.props;
        const { passwordVisible } = this.state;

        return (
            <Form size="large" onSubmit={onSubmit} loading={loading}>
                <InputField
                    name="email"
                    icon="envelope"
                    placeholder="email"
                    value={data.email}
                    disabled={disabled}
                    onChange={onChange}
                    error={errors.email}
                />

                <InputField
                    name="password"
                    icon="lock"
                    placeholder="password"
                    password={!passwordVisible}
                    value={data.password}
                    disabled={disabled}
                    onChange={this.onChange}
                    error={errors.password}
                />

                <InputField
                    name="password-confirm"
                    icon="lock"
                    placeholder="password"
                    password={!passwordVisible}
                    value={data['password-confirm']}
                    disabled={disabled}
                    onChange={this.onChange}
                    error={this.state.errors['password-confirm']}
                />

                <CheckBoxField
                    text="Show Password"
                    disabled={disabled}
                    onChange={this.onShowPassword}
                />

                <Button
                    disabled={!canSubmit || disabled}
                    primary
                    fluid
                    size="large"
                >
                    Login
                </Button>

                {globalError && (
                    <Message negative>
                        <Message.Header>Registration Failure</Message.Header>
                        <p>{globalError}</p>
                    </Message>
                )}
            </Form>
        );
    }
}

export default PasswordUpdate;
