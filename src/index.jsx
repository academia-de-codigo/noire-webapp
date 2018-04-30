import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'root';

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(`Running in Development @ ${new Date()} `);
}

ReactDOM.render(<Root />, document.getElementById('app'));
