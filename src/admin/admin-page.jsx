import React from 'react';
import { Container } from 'semantic-ui-react';
import Nav from 'nav/nav';

function AdminPage() {
    const links = [
        { id: 0, path: '/', text: 'Home' },
        { id: 1, path: '/admin', text: 'Admin' },
        { id: 1, path: '/admin-route1', text: 'Admin Route 1' },
        { id: 2, path: '/admin-route2', text: 'Admin Route 2' }
    ];
    return (
        <div className="page">
            <Nav links={links} />
            <Container>
                <h1>Admin Page</h1>
            </Container>
        </div>
    );
}

export default AdminPage;
