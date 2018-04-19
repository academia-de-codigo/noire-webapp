import React from 'react';
import withNavigation from 'core/nav/with-navigation';

const links = [
    { path: '/', text: 'Home' },
    { path: '/admin', text: 'Admin' },
    { path: '/home-route1', text: 'Home Route 1' },
    { path: '/home-route2', text: 'Home Route 2' }
];

function HomePage() {
    return <h1>Home Page</h1>;
}

export default withNavigation(HomePage, links);
