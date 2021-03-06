import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import InlineError from 'core/messages/inline-error';

function InputField(props) {
    return (
        <Form.Field error={!!props.error}>
            <Input
                name={props.name}
                icon={props.icon}
                iconPosition="left"
                placeholder={props.placeholder}
                type={props.password ? 'password' : 'text'}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
            {!!props.error && <InlineError text={props.error} />}
        </Form.Field>
    );
}

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.string,
    password: PropTypes.bool,
    disabled: PropTypes.bool
};

InputField.defaultProps = {
    placeholder: '',
    value: '',
    icon: null,
    error: null,
    password: false,
    disabled: false
};

export default InputField;
