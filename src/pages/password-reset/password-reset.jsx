import React from 'react';
import PropTypes from 'prop-types';
import InputField from 'core/forms/input-field';
import { Link } from 'react-router-dom';
import { Segment, Header, Form, Button, Message } from 'semantic-ui-react';
import FormBehaviour from 'core/forms/form-behaviour';

function PasswordReset(props) {
    const rules = {
        email: 'required|email'
    };
    return (
        <Segment raised>
            <Header textAlign="center" size="large">
                {props.header}
            </Header>
            <p>{props.children}</p>
            <FormBehaviour
                onSubmit={props.onSubmit}
                rules={rules}
                render={(formProps, handlers) => (
                    <PasswordResetForm {...formProps} {...handlers} />
                )}
            />
        </Segment>
    );
}

PasswordReset.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
    children: PropTypes.node
};

PasswordReset.defaultProps = {
    children: 'Signup Form'
};

function PasswordResetForm(props) {
    const { data, loading, disabled, canSubmit } = props;
    const { errors, globalError } = props;
    const { onChange, onSubmit } = props;

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

            <Button
                disabled={!canSubmit || disabled}
                primary
                fluid
                size="large"
            >
                Sign Up
            </Button>

            {globalError && (
                <Message negative>
                    <Message.Header>Password Reset Failure</Message.Header>
                    <p>{globalError}</p>
                </Message>
            )}
            <div className="login">
                <Link to="/login">Login</Link>
            </div>
        </Form>
    );
}

PasswordResetForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,
    loading: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    canSubmit: PropTypes.bool.isRequired,
    globalError: PropTypes.string
};

PasswordResetForm.defaultProps = {
    globalError: null
};

export default PasswordReset;
