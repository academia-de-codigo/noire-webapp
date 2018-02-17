// @flow

import React from 'react';

const App = (props: { name?: string }) => <div>Hello {props.name}</div>;

App.defaultProps = {
  name: 'World!'
};

export default App;
