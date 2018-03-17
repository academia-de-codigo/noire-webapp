import React from 'react';
import withNavigation from 'core/nav/with-navigation';

const links = [
    { id: 0, path: '/', text: 'Home' },
    { id: 1, path: '/admin', text: 'Admin' },
    { id: 2, path: '/admin-route1', text: 'Admin Route 1' },
    { id: 3, path: '/admin-route2', text: 'Admin Route 2' }
];

function AdminPage() {
    return <h1>Admin Page</h1>;
}

export default withNavigation(AdminPage, links);
