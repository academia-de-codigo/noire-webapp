import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ text }) => (
    <span style={{ fontSize: '0.6em', color: '#ae5856' }}>{text}</span>
);

InlineError.propTypes = {
    text: PropTypes.string.isRequired
};

export default InlineError;
