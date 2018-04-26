import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Message, Segment, Header, Form, Button } from 'semantic-ui-react';
import InputField from 'core/forms/input-field';
import CheckBoxField from 'core/forms/checkbox-field';
import FormBehaviour from 'core/forms/form-behaviour';

function Login(props) {
    const rules = {
        username: 'required|min:3',
        password: 'required|min:3'
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
                    <LoginForm {...formProps} {...handlers} />
                )}
            />
        </Segment>
    );
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    redirect: PropTypes.string,
    children: PropTypes.node
};

Login.defaultProps = {
    children: 'Login Form',
    redirect: null
};

export class LoginForm extends Component {
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
        passwordVisible: false
    };

    onShowPassword = () => {
        this.setState({
            passwordVisible: !this.state.passwordVisible
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
                    onChange={onChange}
                    error={errors.password}
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
                <div className="login">
                    <Link to="/password-reset">Forgot your Password?</Link>
                </div>
            </Form>
        );
    }
}

export default Login;
