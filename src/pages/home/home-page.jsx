import React from 'react';
import { Container } from 'semantic-ui-react';
import Nav from 'core/nav/nav';
import './home-page.css';

function HomePage() {
    const links = [
        { id: 0, path: '/', text: 'Home' },
        { id: 1, path: '/home-route1', text: 'Home Route 1' },
        { id: 2, path: '/home-route2', text: 'Home Route 2' }
    ];
    return (
        <div className="page">
            <Nav links={links} />
            <Container>
                <h1>Home Page</h1>
            </Container>
        </div>
    );
}

export default HomePage;
