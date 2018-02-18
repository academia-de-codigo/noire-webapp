// @flow
import React from 'react';

const InlineError = (props: { text: string }) => (
    <span style={{ fontSize: '0.6em', color: '#ae5856' }}>{props.text}</span>
);

export default InlineError;
