import React from 'react';
import withNavigation from 'core/nav/with-navigation';

const links = [
    { id: 0, path: '/', text: 'Home' },
    { id: 1, path: '/admin', text: 'Admin' },
    { id: 2, path: '/home-route1', text: 'Home Route 1' },
    { id: 3, path: '/home-route2', text: 'Home Route 2' }
];

function HomePage() {
    return <h1>Home Page</h1>;
}

export default withNavigation(HomePage, links);
