import React from 'react';
import withNavigation from 'core/nav/with-navigation';

const links = [
    { path: '/', text: 'Home' },
    { path: '/admin', text: 'Admin' },
    { path: '/admin-route1', text: 'Admin Route 1' },
    { path: '/admin-route2', text: 'Admin Route 2' }
];

function AdminPage() {
    return <h1>Admin Page</h1>;
}

export default withNavigation(AdminPage, links);
