import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'semantic-ui-react';

function CheckBoxField(props) {
    return (
        <Form.Field>
            <Checkbox
                toggle
                label={!!props.text && props.text}
                onChange={props.onChange}
            />
        </Form.Field>
    );
}

CheckBoxField.propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

CheckBoxField.defaultProps = {
    text: null
};

export default CheckBoxField;
