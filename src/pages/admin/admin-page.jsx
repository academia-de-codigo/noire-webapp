import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import Nav from 'core/nav/nav';

function AdminPage({ history }) {
    const links = [
        { id: 0, path: '/', text: 'Home' },
        { id: 1, path: '/admin', text: 'Admin' },
        { id: 2, path: '/admin-route1', text: 'Admin Route 1' },
        { id: 3, path: '/admin-route2', text: 'Admin Route 2' }
    ];
    return (
        <div className="page">
            <Nav links={links} onLogout={() => history.push('/')} />
            <Container>
                <h1>Admin Page</h1>
            </Container>
        </div>
    );
}

AdminPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default AdminPage;
