import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import Nav from 'core/nav/nav';
import './home-page.css';

function HomePage({ history }) {
    const links = [
        { id: 0, path: '/', text: 'Home' },
        { id: 1, path: '/admin', text: 'Admin' },
        { id: 2, path: '/home-route1', text: 'Home Route 1' },
        { id: 3, path: '/home-route2', text: 'Home Route 2' }
    ];
    return (
        <div className="page">
            <Nav links={links} onLogout={() => history.push('/')} />
            <Container>
                <h1>Home Page</h1>
            </Container>
        </div>
    );
}

HomePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default HomePage;
