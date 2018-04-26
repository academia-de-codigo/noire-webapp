import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'semantic-ui-react';

function CheckBoxField(props) {
    return (
        <Form.Field>
            <Checkbox
                toggle
                label={!!props.text && props.text}
                disabled={props.disabled}
                onChange={props.onChange}
            />
        </Form.Field>
    );
}

CheckBoxField.propTypes = {
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string,
    disabled: PropTypes.bool
};

CheckBoxField.defaultProps = {
    text: null,
    disabled: false
};

export default CheckBoxField;
